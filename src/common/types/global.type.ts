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
    Doctor = 'doctor',
    Patient = 'patient',
    Insurance = 'insurance',
    Billing = 'billing',
    Facility = 'facility',
    EmergencyCare = 'emergency_care',
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