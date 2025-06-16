import { BadRequestException, Inject, Injectable, Scope, UnauthorizedException } from "@nestjs/common";
import { Account } from "src/auth-system/accounts/entities/account.entity";
import { generateOtp } from "src/utils/generateOPT";
import * as crypto from 'crypto'
import { BaseRepository } from "src/common/repository/base-repository";
import { DataSource } from "typeorm";
import { FastifyRequest } from "fastify";
import { REQUEST } from "@nestjs/core";
import { JwtService as JwtSer, TokenExpiredError } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { EncryptionService } from "src/auth-system/encryption/encryption.service";
import { AuthMessage, Tokens } from "src/common/CONSTANTS";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EnvService } from "src/env/env.service";
import { EOptVerificationType, OtpVerificationPending } from "../entities/otp-verification-pending.entity";
import { OtpVerificationDto } from "../dto/auth.dto";
import { IVerifyEncryptedHashTokenPairReturn } from "./interface";

@Injectable({ scope: Scope.REQUEST })
export class AuthHelper extends BaseRepository {
    constructor(
        private readonly datasource: DataSource,
        @Inject(REQUEST) req: FastifyRequest,
        private readonly jwtService: JwtSer,
        private readonly envService: EnvService,
        private readonly encryptionService: EncryptionService,
        private readonly eventEmitter: EventEmitter2,
    ) { super(datasource, req) }

    private readonly otpVerificationPendingRepo = this.datasource.getRepository(OtpVerificationPending)
    private readonly accountsRepo = this.datasource.getRepository<Account>(Account);

    /**
     * Verification token generation:
     * 
     * 1. Generate a jwt token with email as payload
     * 2. Encrypt the jwt token
     * 3. Hash the encrypted token
     * 4. Save the hashed token in db
     * 5. Send the encrypted token to the user's email
     */
    async generateOtp(account: Account, type: EOptVerificationType, deviceId: string = null) {
        const otpSecret = this.getOtpSecrets(type);

        const otp = generateOtp();
        const verificationToken = await this.jwtService.signAsync(
            { email: account.email },
            {
                secret: otpSecret.secret,
                expiresIn: otpSecret.expiration,
            }
        );

        const encryptedVerificationToken = this.encryptionService.encrypt(verificationToken);

        const hashedVerificationToken = crypto
            .createHash('sha256')
            .update(encryptedVerificationToken)
            .digest('hex');

        // delete existing if any
        await this.otpVerificationPendingRepo.delete({ email: account.email, type });

        const otpVerificationPending = this.otpVerificationPendingRepo.create({
            email: account.email,
            otp: String(otp),
            hashedVerificationToken,
            type,
            deviceId
        });
        await this.otpVerificationPendingRepo.save(otpVerificationPending);
        return { otp, encryptedVerificationToken };

    }

    async verifyPendingOtp({
        otpVerificationDto,
        type,
        deviceId = null,
    }: {
        otpVerificationDto: OtpVerificationDto,
        type: EOptVerificationType,
        deviceId?: string;
    }): Promise<OtpVerificationPending> {
        const { otp, verificationToken } = otpVerificationDto;
        const otpSecret = this.getOtpSecrets(type);

        let payload: { email: string };
        try {
            const decryptedToken = this.encryptionService.decrypt(verificationToken);
            // verify jwt token
            payload = await this.jwtService.verifyAsync(decryptedToken, {
                secret: otpSecret.secret, // get the secret based on type
            });
        } catch (e) {
            if (e instanceof TokenExpiredError) throw new BadRequestException({
                error: AuthMessage.TOKEN_EXPIRED,
                message: 'OTP has been expired'
            });
            throw new BadRequestException('Invalid token');
        }

        const foundRequest = await this.otpVerificationPendingRepo.findOneBy({
            email: payload.email,
            type,
            deviceId
        });

        if (!foundRequest) throw new BadRequestException('Invalid token received');

        const verificationTokenHash = crypto
            .createHash('sha256')
            .update(verificationToken) // this is supposed to be encrypted token, if not, it's invalid
            .digest('hex')

        // comapre the token has with found request hash
        if (verificationTokenHash !== foundRequest.hashedVerificationToken) throw new BadRequestException('Invalid token received');

        // CHECK IF OTP IS VALID
        const isOtpValid = bcrypt.compareSync(String(otp), foundRequest.otp);
        if (!isOtpValid) throw new BadRequestException('Invalid OTP');

        return foundRequest;
    }

    getOtpSecrets(type: EOptVerificationType) {
        const otpVerificationSecrets = {
            [EOptVerificationType.EMAIL_VERIFICATION]: {
                secret: this.envService.EMAIL_VERIFICATION_SECRET,
                expiration: this.envService.EMAIL_VERIFICATION_EXPIRATION_SEC
            },
        };

        return otpVerificationSecrets[type];
    }

    /**
     * Returns Account object if credentials are valid. 
     * If account is not verified, send confirmation email
     */
    async validateAccount(email: string, password: string): Promise<Account> {
        const foundAccount = await this.accountsRepo.findOne({
            where: { email },
        });

        if (!foundAccount) throw new UnauthorizedException(AuthMessage.INVALID_AUTH_CREDENTIALS);

        if (!foundAccount.verifiedAt) throw new UnauthorizedException("Account is not verified");

        const isPasswordValid = await bcrypt.compare(
            password,
            foundAccount.password,
        );

        if (!isPasswordValid) throw new UnauthorizedException(AuthMessage.INVALID_AUTH_CREDENTIALS)

        return foundAccount;
    }

    /**
     * Generates a token pair [encrypted, hashedEncryptedToken] for the provided payload with the provided secret and expiration
     * 
     * @returns [encryptedToken, hashedEncryptedToken]
     */
    async getEncryptedHashTokenPair(payload: any, secret: string, expiration: number): Promise<[string, string]> {
        const token = await this.jwtService.signAsync(
            payload,
            {
                secret,
                expiresIn: expiration,
            }
        );

        const encryptedToken = this.encryptionService.encrypt(token);

        const hashedToken = crypto
            .createHash('sha256')
            .update(encryptedToken)
            .digest('hex');

        return [encryptedToken, hashedToken];
    }

    async verifyEncryptedHashTokenPair<T>(encryptedToken: string, secret: string): Promise<IVerifyEncryptedHashTokenPairReturn<T>> {
        const tokenHash = crypto
            .createHash('sha256')
            .update(encryptedToken)
            .digest('hex');

        try {
            const decryptedToken = this.encryptionService.decrypt(encryptedToken);
            const payload = await this.jwtService.verifyAsync(decryptedToken, { // verify if the jwt is valid
                secret,
            });

            return { payload, tokenHash, error: null };
        } catch (e) {
            return { payload: null, tokenHash: null, error: e };
        }
    }
}