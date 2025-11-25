import SelectLanguage from '@/components/general/SelectLanguage';
import BackgroundPanel from '@/components/layout/BackgroundPanel';
import { Outlet } from 'react-router-dom';

export default function FormPanelLayout() {
    return (
        <div className='container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
            <BackgroundPanel />
            <div className='absolute top-4 right-4 md:right-8 md:top-8'>
                <SelectLanguage />
            </div>
            <Outlet />
        </div>
    );
}
