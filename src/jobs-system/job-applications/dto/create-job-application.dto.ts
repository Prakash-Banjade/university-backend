import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, IsUUID, Length, Matches, Min } from "class-validator";
import { NAME_WITH_SPACE_REGEX } from "src/common/CONSTANTS";

export class CreateJobApplicationDto {
    @ApiProperty({ type: 'string', description: 'Full name of the candidate' })
    @IsString()
    @IsNotEmpty()
    @Matches(NAME_WITH_SPACE_REGEX, { message: "Not a valid name" })
    @Transform(({ value }) => value?.trim())
    fullname: string;

    @ApiProperty({ type: 'string', format: 'email', description: 'Email of the candidate' })
    @IsEmail()
    @Transform(({ value }) => value?.trim())
    email: string;

    @ApiProperty({ type: 'string', description: 'Phone number of the candidate' })
    @IsPhoneNumber("NP", { message: "Phone number is not valid." })
    @IsNotEmpty()
    @Transform(({ value }) => value?.trim())
    phone: string;

    @ApiProperty({ type: 'string', description: 'Qualification of the candidate' })
    @IsString()
    @Length(3, 50, { message: 'Qualification must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    qualification: string;

    @ApiProperty({ type: 'string', description: 'Current organization of the candidate' })
    @IsString()
    @Length(3, 50, { message: 'Current organization must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    currentOrganization: string;

    @ApiProperty({ type: 'string', description: 'Current designation of the candidate' })
    @IsString()
    @Length(3, 50, { message: 'Current designation must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    currentDesignation: string;

    @ApiProperty({ type: 'number', description: 'Current salary of the candidate' })
    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'Current salary must be greater than or equal to 0' })
    currentSalary?: number;

    @ApiProperty({ type: 'number', description: 'Expected salary of the candidate' })
    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'Expected salary must be greater than or equal to 0' })
    expectedSalary?: number;

    @ApiProperty({ type: 'number', description: 'Notice period of the candidate' })
    @IsOptional()
    @IsNumber()
    @Min(0, { message: 'Notice period must be greater than or equal to 0' })
    noticePeriod: number;

    @ApiProperty({ type: 'string', format: 'uuid', description: 'Job ID' })
    @IsUUID()
    jobId: string

    @ApiProperty({ type: 'string', format: 'uuid', description: 'Resume ID' })
    @IsUUID()
    resumeId: string
}
