import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Length, Matches } from "class-validator";
import { NAME_WITH_SPACE_REGEX } from "src/common/CONSTANTS";

export class ContactQueryDto {
    @ApiProperty({ type: 'string', description: 'Name' })
    @IsString()
    @IsNotEmpty()
    @Matches(NAME_WITH_SPACE_REGEX, { message: "Not a valid name" })
    name: string;

    @ApiPropertyOptional({ type: 'string', format: 'email', description: 'Email' })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ type: 'string', description: 'Phone number' })
    @IsPhoneNumber("NP", { message: "Phone number is not valid." })
    phone: string;

    @ApiProperty({ type: 'string', description: 'Message' })
    @IsNotEmpty()
    @IsString()
    @Length(10, 500, { message: "Message must be between 10 and 500 characters." })
    message: string;
}