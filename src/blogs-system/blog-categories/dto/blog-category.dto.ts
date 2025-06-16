import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class BlogCategoryDto {
    @ApiProperty()
    @IsString()
    @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
    name: string;
}