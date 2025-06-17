import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsString, Length } from "class-validator";

export class CreateGalleryCategoryDto {
    @ApiProperty({ type: 'string', description: 'Name of the gallery category' })
    @IsString()
    @Length(3, 50, { message: "Name must be between 3 and 50 characters" })
    @Transform(({ value }) => value?.trim())
    name: string;
}
