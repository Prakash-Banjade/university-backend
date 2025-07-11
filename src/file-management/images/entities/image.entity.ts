import { Blog } from "src/blogs-system/blogs/entities/blog.entity";
import { BaseEntity } from "src/common/entities/base.entity";
import { Course } from "src/courses/entities/course.entity";
import { GalleryCategory } from "src/gallery-system/gallery-categories/entities/gallery-category.entity";
import { GeneralSetting } from "src/general-setting/entities/general-setting.entity";
import { HeroSection } from "src/pages/hero-section/entities/hero-section.entity";
import { Column, Entity, ManyToOne, OneToOne } from "typeorm";

@Entity()
export class Image extends BaseEntity {
    @Column({ type: 'varchar' })
    url!: string

    @Column({ type: 'varchar' })
    mimeType!: string

    @Column({ type: 'varchar' })
    format!: string

    @Column({ type: 'varchar' })
    space!: string

    @Column({ type: 'real' })
    height!: number

    @Column({ type: 'real' })
    width!: number

    @Column({ type: 'int' })
    size!: number

    @Column({ type: 'varchar' })
    originalName!: string

    @Column({ type: 'varchar', default: '' })
    name!: string

    /**
    |--------------------------------------------------
    | RELATIONS
    |--------------------------------------------------
    */

    @OneToOne(() => Blog, blog => blog.featuredImage, { onDelete: 'CASCADE', nullable: true })
    blog_featuredImage: Blog;

    @OneToOne(() => Blog, blog => blog.coverImage, { onDelete: 'CASCADE', nullable: true })
    blog_coverImage: Blog;

    @OneToOne(() => HeroSection, heroSection => heroSection.image, { onDelete: 'CASCADE', nullable: true })
    heroSection_image: HeroSection;

    @OneToOne(() => GeneralSetting, generalSetting => generalSetting.primaryLogo, { nullable: true })
    generalSetting_logoPrimary: GeneralSetting;

    @OneToOne(() => GeneralSetting, generalSetting => generalSetting.secondaryLogo, { nullable: true })
    generalSetting_logoSecondary: GeneralSetting;

    @OneToOne(() => Course, course => course.coverImage, { onDelete: 'CASCADE', nullable: true })
    course_coverImage: Course;

    @ManyToOne(() => GalleryCategory, galleryCategory => galleryCategory.images, { onDelete: 'CASCADE', nullable: true })
    galleryCategory: GalleryCategory | null
}
