import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsString, Length } from "class-validator";
import { EFaqType } from "src/common/types/global.type";

export class CreateFaqDto {
    @ApiProperty({ type: String, description: 'Title' })
    @IsString()
    @Length(10, 100, { message: 'Title must be between 10 and 100 characters' })
    title: string;

    @ApiProperty({ type: String, description: 'Description' })
    @IsString()
    @Length(100, 500, { message: 'Description must be between 100 and 500 characters' })
    description: string;

    @ApiProperty({ type: String, enum: EFaqType, description: 'Category', example: EFaqType.General })
    @IsEnum(EFaqType)
    category: EFaqType
}