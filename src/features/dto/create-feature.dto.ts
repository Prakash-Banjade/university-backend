import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreateFeatureDto {
    @ApiProperty({ type: 'string', description: 'Title' })
    @IsString()
    @Length(3, 50, { message: 'Title must be between 3 and 50 characters' })
    @Transform(({ value }) => value?.trim())
    title: string;

    @ApiProperty({ type: 'string', description: 'Description' })
    @IsString()
    @Length(10, 300, { message: 'Description must be between 10 and 300 characters' })
    @Transform(({ value }) => value?.trim())
    description: string;

    @ApiPropertyOptional()
    @IsUUID()
    @IsOptional()
    imageId: string;
}
