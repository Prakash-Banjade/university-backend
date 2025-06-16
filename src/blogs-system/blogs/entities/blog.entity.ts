import { BlogCategory } from "src/blogs-system/blog-categories/entities/blog-category.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { Image } from "src/file-management/images/entities/image.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class Blog extends BaseEntity {
    @Column({ type: 'text' })
    @Index()
    title: string;

    @Index({ unique: true })
    @Column({ type: 'varchar' })
    slug: string;

    @Column({ type: 'text', nullable: true })
    summary: string;

    @Column({ type: 'text' })
    content: string;

    @OneToOne(() => Image, image => image.blog_featuredImage, { cascade: true, nullable: false })
    @JoinColumn()
    featuredImage: Image;

    @OneToOne(() => Image, image => image.blog_coverImage, { cascade: true, nullable: true })
    @JoinColumn()
    coverImage: Image;

    @ManyToOne(() => BlogCategory, (category) => category.blogs, { onDelete: 'CASCADE', nullable: false })
    category: BlogCategory;
}
