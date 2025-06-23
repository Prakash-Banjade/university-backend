import { createHash } from 'crypto';
import { FormFieldDef, FormFieldType } from 'src/form-management/forms/form-fields';
import { z, ZodError, ZodIssue } from 'zod';

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

export function buildFormValidator(fields: FormFieldDef[]) {
    const shape: Record<string, z.ZodTypeAny> = {}

    for (const f of fields) {
        let s: z.ZodTypeAny

        // 1) build base schema
        switch (f.type) {
            case FormFieldType.Email:
                s = z.string().email({ message: `${f.label} must be a valid email` })
                break

            case FormFieldType.Tel:
                s = z.string().regex(/^\+?[0-9\s-]{7,15}$/, { message: `${f.label} must be a valid phone` })
                break

            case FormFieldType.Number:
                s = z.number({ invalid_type_error: `${f.label} must be a number` })
                break

            case FormFieldType.Select:
                if (f.multiple) {
                    // multiple select → array of enum
                    const enumValues = f.options!.map(o => o.value) as [string, ...string[]]
                    s = z.array(z.enum(enumValues), {
                        invalid_type_error: `${f.label} must be one of ${enumValues.join(', ')}`
                    })
                } else {
                    // single select → enum
                    const enumValues = f.options!.map(o => o.value) as [string, ...string[]]
                    s = z.enum(enumValues, {
                        errorMap: () => ({ message: `${f.label} must be one of ${enumValues.join(', ')}` })
                    })
                }
                break

            case FormFieldType.File:
                // assume file fields are sent as URL strings
                s = z.string().url({ message: `${f.label} must be a valid URL` })
                break

            default:
                s = z.string({ invalid_type_error: `${f.label} must be a string` })
        }

        // 2) apply extra validations on strings
        if ([FormFieldType.Text, FormFieldType.Email, FormFieldType.Tel, FormFieldType.Textarea].includes(f.type) && f.validation) {
            if (f.validation.minLength) {
                s = (s as z.ZodString).min(f.validation.minLength, {
                    message: `${f.label} must be at least ${f.validation.minLength} chars`
                })
            }
            if (f.validation.maxLength) {
                s = (s as z.ZodString).max(f.validation.maxLength, {
                    message: `${f.label} must be at most ${f.validation.maxLength} chars`
                })
            }
            if (f.validation.pattern) {
                s = (s as z.ZodString).regex(new RegExp(f.validation.pattern), {
                    message: `${f.label} is invalid`
                })
            }
        }

        // 3) required logic
        if (f.required) {
            if (f.type === FormFieldType.Number) {
                // enforce at least something — ZodNumber rejects undefined by default
            }
            else if (f.type === FormFieldType.Select && f.multiple) {
                // require at least one selection
                s = (s as z.ZodArray<z.ZodEnum<[string, ...string[]]>>).min(1, {
                    message: `Select at least one ${f.label.toLowerCase()}`
                })
            }
            // single-select enums and strings are already required by default
        } else {
            // make it optional
            s = s.optional()
        }

        shape[f.name] = s
    }

    return z.object(shape)
}

/**
 * Flattens a ZodError into a one-liner message:
 *   "lastName: Required; email: Required; phone: Required"
 */
export function formatZodErrors(error: ZodError): string {
    return error.issues
        .map((issue: ZodIssue) => {
            // field path, e.g. ['user','email'] → 'user.email'
            const field = issue.path.join('.') || 'value'
            // your custom mapping of Zod codes → messages
            let msg = issue.message
            // you can further customize based on issue.code or expected/received
            if (issue.code === 'invalid_type' && msg.toLowerCase() === 'required') {
                msg = 'is required'
            }
            return `${field} ${msg}`
        })
        .join('; ')
}
