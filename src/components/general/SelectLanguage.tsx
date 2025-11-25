import { useTranslation } from 'react-i18next';
import { LANGUAGES_MAPPER } from '@/configs/constants';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/common/Select';
import { LanguageInfo } from '@/types/language';

export default function SelectLanguage() {
    // hooks
    const {
        t,
        i18n: { language, changeLanguage }
    } = useTranslation();

    // variables
    const languages: LanguageInfo[] = [
        LANGUAGES_MAPPER.english,
        LANGUAGES_MAPPER.vietnamese
    ];
    const selectedLanguage = languages.find(lang => lang.code === language);

    // function
    const onChangeSelectLanguage = (locale: string) => {
        changeLanguage(locale);
    };

    return (
        <Select
            onValueChange={onChangeSelectLanguage}
            defaultValue={selectedLanguage?.code}
        >
            <SelectTrigger className='border-none w-[100px]'>
                <SelectValue>
                    {selectedLanguage && (
                        <>
                            <span
                                className={`fi fi-${selectedLanguage.flag} mr-2`}
                            >
                            </span>
                            <span>{selectedLanguage.shortName}</span>
                        </>
                    )}
                </SelectValue>
            </SelectTrigger>
            <SelectContent className='w-[180px]'>
                {languages.map(lang => (
                    <SelectItem
                        className='hover:cursor-pointer'
                        key={lang.code}
                        value={lang.code}
                    >
                        <span className={`fi fi-${lang.flag} mr-2`}></span>
                        <span>{t(lang.fullname)}</span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
