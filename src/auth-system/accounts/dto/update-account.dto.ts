import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID, Matches } from "class-validator";
import { NAME_REGEX, NAME_WITH_SPACE_REGEX } from "src/common/CONSTANTS";

export class UpdateAccountDto {
    @ApiPropertyOptional({ type: "string", description: 'Student first name' })
    @IsString()
    @IsNotEmpty()
    @Matches(NAME_REGEX, {
        message: 'Name can have only alphabets'
    })
    @IsOptional()
    firstName?: string;

    @ApiPropertyOptional({ type: "string", description: 'Student last name' })
    @IsString()
    @IsNotEmpty()
    @Matches(NAME_WITH_SPACE_REGEX, {
        message: 'Seems like invalid last name'
    })
    @IsOptional()
    lastName?: string;

    @ApiPropertyOptional({ type: "string", description: 'Email' })
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiPropertyOptional({ type: "string", description: 'Image ID/URL' })
    @IsUUID()
    @IsOptional()
    profileImageId?: string | null;

    constructor(obj: UpdateAccountDto) {
        obj.email && (this.email = obj.email);
        obj.firstName && (this.firstName = obj.firstName)
        obj.lastName && (this.lastName = obj.lastName)
        this.profileImageId = obj.profileImageId // profile image id can be null
    }
}