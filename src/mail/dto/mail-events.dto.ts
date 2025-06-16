export class ConfirmationMailEventDto {
    receiverEmail: string;
    receiverName: string;
    token: string;
    otp: number;
    expirationMin: number;

    constructor(dto: ConfirmationMailEventDto) {
        Object.assign(this, dto);
    }
}

export class TwoFAMailEventDto {
    receiverEmail: string;
    receiverName: string;
    otp: number;
    expirationMin: number;
    constructor(dto: TwoFAMailEventDto) {
        Object.assign(this, dto);
    }
}

export class ResetPasswordMailEventDto {
    receiverEmail: string;
    receiverName: string;
    token: string;

    constructor(dto: ResetPasswordMailEventDto) {
        Object.assign(this, dto);
    }
}