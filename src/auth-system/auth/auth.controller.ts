import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply, FastifyRequest } from 'fastify';
import { SignInDto } from './dto/signIn.dto';
import { Public } from 'src/common/decorators/setPublicRoute.decorator';
import { TransactionInterceptor } from 'src/common/interceptors/transaction.interceptor';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { AuthUser } from 'src/common/types/global.type';
import { ChangePasswordDto, EmailOnlyDto, ResetPasswordDto, UpdateEmailDto, VerifyTokenDto } from './dto/auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) { }

    @ApiOperation({ summary: 'Login a user' })
    @ApiResponse({ status: 200, description: 'User successfully logged in.' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    @UseInterceptors(TransactionInterceptor)
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    login(
        @Body() signInDto: SignInDto,
        @Req() request: FastifyRequest,
        @Res({ passthrough: true }) response: FastifyReply,
    ) {
        return this.authService.login(signInDto, request, response);
    }

    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 200, description: 'Access token refreshed successfully.' })
    @ApiResponse({ status: 401, description: 'Invalid refresh token.' })
    @HttpCode(HttpStatus.OK)
    @UseGuards(RefreshTokenGuard)
    @Public()
    @Post('refresh')
    refresh(@Req() req: FastifyRequest, @Res({ passthrough: true }) res: FastifyReply) {
        return this.authService.refresh(req, res);
    }

    @ApiOperation({ summary: 'Logout a user' })
    @ApiResponse({ status: 200, description: 'User successfully logged out.' })
    @ApiResponse({ status: 401, description: 'Invalid session.' })
    @UseGuards(RefreshTokenGuard)
    @ApiBearerAuth()
    @Post('logout')
    logout(@Res({ passthrough: true }) res: FastifyReply) {
        return this.authService.logout(res);
    }

    @ApiOperation({ summary: 'Change the password of the authenticated user' })
    @ApiResponse({ status: 200, description: 'Password changed successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid current password.' })
    @ApiResponse({ status: 401, description: 'Unauthorized.' })
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(TransactionInterceptor)
    @ApiBearerAuth()
    @Post('change-password')
    changePassword(@Body() changePasswordDto: ChangePasswordDto, @CurrentUser() currentUser: AuthUser) {
        return this.authService.changePassword(changePasswordDto, currentUser);
    }

    @ApiOperation({ summary: 'Request password reset' })
    @ApiResponse({ status: 200, description: 'Password reset request sent successfully.' })
    @ApiResponse({ status: 404, description: 'Account not found.' })
    @Post('forgot-password')
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(TransactionInterceptor)
    @Public()
    forgotPassword(@Body() { email }: EmailOnlyDto) {
        return this.authService.forgotPassword(email)
    }

    @ApiOperation({ summary: 'Verify password reset token' })
    @ApiResponse({ status: 200, description: 'Token is valid.' })
    @ApiResponse({ status: 400, description: 'Invalid or expired token.' })
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('verify-pwd-reset-token')
    verifyResetToken(@Body() verifyTokenDto: VerifyTokenDto) {
        return this.authService.verifyResetToken(verifyTokenDto.token)
    }

    @ApiOperation({ summary: 'Reset the password using token' })
    @ApiResponse({ status: 200, description: 'Password reset successfully.' })
    @ApiResponse({ status: 400, description: 'Invalid or expired token.' })
    @HttpCode(HttpStatus.OK)
    @UseInterceptors(TransactionInterceptor)
    @Public()
    @Post('reset-password')
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }

    @ApiOperation({ summary: 'Update the email of the authenticated user' })
    @ApiResponse({ status: 200, description: 'Email updated successfully.' })
    @ApiResponse({ status: 500, description: 'Failed to update email. Server error.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Password is incorrect.' })
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @Post('update-email')
    updateEmail(@Body() updateEmailDto: UpdateEmailDto, @CurrentUser() currentUser: AuthUser) {
        return this.authService.updateEmail(updateEmailDto, currentUser);
    }
}
