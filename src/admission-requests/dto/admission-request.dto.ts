import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID, Length, Matches } from "class-validator";
import { NAME_REGEX, NAME_WITH_SPACE_REGEX } from "src/common/CONSTANTS";

export class AdmissionRequestDto {
    @ApiProperty({ type: 'string', description: 'Name' })
    @IsString()
    @IsNotEmpty()
    @Matches(NAME_REGEX, { message: "First name is not valid" })
    firstName: string;

    @ApiProperty({ type: 'string', description: 'Name' })
    @IsString()
    @IsNotEmpty()
    @Matches(NAME_WITH_SPACE_REGEX, { message: "Last name is not valid" })
    lastName: string;

    @ApiPropertyOptional({ type: 'string', format: 'email', description: 'Email' })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty({ type: 'string', description: 'Phone number' })
    @IsPhoneNumber("NP", { message: "Phone number is not valid." })
    phone: string;

    @ApiProperty({ type: 'string', description: 'Course slug' })
    @IsString()
    @IsNotEmpty()
    @Length(3, 100, { message: "Course slug must be between 3 and 100 characters." })
    @Transform(({ value }) => value?.trim())
    courseSlug: string;

    @ApiProperty({ type: 'string', description: 'Address' })
    @IsString()
    @Length(3, 500, { message: "Address must be between 3 and 500 characters." })
    @Transform(({ value }) => value?.trim())
    address: string;
}