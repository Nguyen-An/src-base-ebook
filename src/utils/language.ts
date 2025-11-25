import { LANGUAGES_MAPPER } from '@/configs/constants';
import { LANGUAGES_SUPPORTED } from '@/types/enums';
import { Locale } from 'date-fns';

export const getLocaleDateFns = (locale: string): Locale => {
    switch (locale) {
        case LANGUAGES_SUPPORTED.Vietnamese:
            return LANGUAGES_MAPPER.vietnamese.dateFns;

        default:
            return LANGUAGES_MAPPER.english.dateFns;
    }
};
