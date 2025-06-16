import { Blog } from "src/blogs-system/blogs/entities/blog.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity, Index, OneToMany } from "typeorm";

@Entity()
export class BlogCategory extends BaseEntity {
    @Index({ unique: true })
    @Column({ type: 'varchar' })
    name: string;

    @OneToMany(() => Blog, blog => blog.category)
    blogs: Blog[];
}