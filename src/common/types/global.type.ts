export interface AuthUser {
    firstName: string;
    lastName: string;
    accountId: string;
    email: string;
    deviceId: string,
}

export enum EFileMimeType {
    Image_JPEG = 'image/jpeg',
    Image_PNG = 'image/png',
    Image_WEBP = 'image/webp',
    PDF = 'application/pdf',
}

export enum EFaqType {
    General = 'general',
    Admission = 'admission',
    Courses = 'courses',
    Academics = 'academics',
    Financial = 'financial',
    Others = 'others',
}

export enum EAcademicDegree {
    Post_Graduate = 'post_graduate',
    Graduate = 'graduate',
    Undergraduate = 'undergraduate',
    PhD = 'phd',
}

export enum EAcademicFaculty {
    Science = 'science',
    Management = 'management',
    Arts = 'arts',
    Humanity = 'humanity',
    Law = 'law',
    Other = 'other',
}

export enum EAlignment {
    Left = 'left',
    Center = 'center',
    Right = 'right',
}

export enum EAlignmentExcludeCenter {
    Left = 'left',
    Right = 'right'
}

export enum ELinkVariant {
    Primary = 'primary',
    Secondary = 'secondary',
    Outline = 'outline'
}

export interface Link {
    text: string,
    link: string,
    variant: ELinkVariant
    icon?: string
}