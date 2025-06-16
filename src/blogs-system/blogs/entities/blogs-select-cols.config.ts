import { FindOptionsSelect } from "typeorm";
import { Blog } from "./blog.entity";

export const blogsSelectCols: FindOptionsSelect<Blog> = {
    id: true,
    createdAt: true,
    updatedAt: true,
    title: true,
    slug: true,
    coverImage: {
        id: true,
        url: true,
    },
    featuredImage: {
        id: true,
        url: true,
    },
    summary: true,
    category: {
        id: true,
        name: true,
    }
} 