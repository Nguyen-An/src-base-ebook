import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
    // hooks
    const { t } = useTranslation();

    return (
        <div className='z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='mx-4 md:mx-8 flex h-14 items-center'>
                <p className='text-xs md:text-sm leading-loose text-muted-foreground text-left'>
                    {t('description')}
                    {' '}
                    <Link
                        to='https://react.dev/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='font-medium underline underline-offset-4'
                    >
                        React
                    </Link>
                    {' '}
                    <Link
                        to='https://tailwindcss.com/'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='font-medium underline underline-offset-4'
                    >
                        TailwindCSS
                    </Link>
                    {' '}
                    <Link
                        to='https://mobx.js.org/README.html'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='font-medium underline underline-offset-4'
                    >
                        Mobx
                    </Link>
                </p>
            </div>
        </div>
    );
}
