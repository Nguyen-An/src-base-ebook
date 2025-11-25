import './services/i18n';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LoadingApi from './components/loading/LoadingApi';

import '/node_modules/flag-icons/css/flag-icons.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.scss';
import { ToastContainer } from 'react-toastify';
import Modals from './components/modal/Modals';

export default function App() {
    // hooks
    const { i18n } = useTranslation();

    // lifecycle
    useEffect(() => {
        // Set initial language
        handleLanguageChange(i18n.language);

        // Listen for language changes
        i18n.on('languageChanged', handleLanguageChange);

        // Clean up listener on unmount
        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n]);

    // function
    const handleLanguageChange = (lng: string) => {
        document.documentElement.lang = lng;
    };

    return (
        <div className='app'>
            <Outlet />
            <LoadingApi />
            <ToastContainer />
            <Modals />
        </div>
    );
}
