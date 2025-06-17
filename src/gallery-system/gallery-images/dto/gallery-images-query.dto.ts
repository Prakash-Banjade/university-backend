import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { QueryDto } from "src/common/dto/query.dto";

export class GalleryImagesQueryDto extends QueryDto {
    @ApiPropertyOptional({ type: 'string', description: 'Category of the image' })
    @IsString()
    @IsOptional()
    category?: string;
}