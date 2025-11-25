export const LANGUAGES_SUPPORTED = {
    English: 'en',
    Vietnamese: 'vi'
} as const;

export type LanguagesSupported = (typeof LANGUAGES_SUPPORTED)[keyof typeof LANGUAGES_SUPPORTED];

export const STATUS = {
    Inactive: 0,
    Active: 1,
    WaitConfirm: 2
} as const;

export type Status = (typeof STATUS)[keyof typeof STATUS];

export const GENDER = {
    Male: 0,
    Female: 1
} as const;

export type Gender = (typeof GENDER)[keyof typeof GENDER];
