import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUUID, Length } from "class-validator";

export class CreateBlogDto {
    @ApiProperty()
    @IsString()
    @Length(10, 100, { message: 'Title must be between 10 and 100 characters' })
    title: string;

    @ApiProperty()
    @IsString()
    @Length(100, 300, { message: 'Summary must be between 100 and 300 characters' })
    summary: string;

    @ApiProperty()
    @IsString()
    @Length(300, 10000, { message: 'Content must be between 100 and 10000 characters' })
    content: string;

    @ApiProperty()
    @IsUUID()
    featuredImageId: string;

    @ApiProperty()
    @IsUUID()
    @IsOptional()
    coverImageId?: string;

    @ApiProperty()
    @IsUUID()
    categoryId: string;
}
