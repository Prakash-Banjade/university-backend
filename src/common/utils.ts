import { createHash } from 'crypto';

export function generateDeviceId(userAgent: string, ipAddress: string): string {
    return createHash('sha256').update(`${userAgent}-${ipAddress}`).digest('hex');
}

export function getLowerCasedFullName(firstName: string, lastName: string): string {
    return `${firstName?.trim()} ${lastName?.trim()}`.toLowerCase();
}


/**
 * @description Returns an array of strings from a string or an array of strings
 * @param {string | string[] | undefined} value - The input value to be processed.
 * @returns {string[]} An array of strings.
 */
export function getArrayQueryParam(value: string | string[] | undefined): string[] {
    return Array.isArray(value) ? value : typeof value === 'string' ? value.split(',') : [];
}