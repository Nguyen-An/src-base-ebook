import Breadcrumb from '@/components/common/Breadcrumb';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/menu-bar/Navbar';
import Sidebar from '@/components/layout/menu-bar/Sidebar';
import { useStore } from '@/hooks/useStore';
import { getBreadcrumb, getTitlePage } from '@/utils/routes';
import { cn } from '@/utils/utils';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

export default observer(function AdminPanelLayout() {
    // hooks
    const { pathname } = useLocation();

    // variables
    const title = getTitlePage(pathname);
    const breadcrumb = getBreadcrumb(pathname);

    // store
    const {
        uiStore: { isOpenSidebar },
        authStore: { getProfile }
    } = useStore();

    // lifecycle
    useEffect(() => {
        // getProfile();
    }, [pathname]);

    return (
        <>
            <Sidebar />
            <main
                className={cn(
                    'min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
                    isOpenSidebar === false ? 'lg:ml-[90px]' : 'lg:ml-72'
                )}
            >
                <Navbar title={title} />
                <div className='container pt-8 pb-8 px-4 sm:px-8'>
                    <Breadcrumb breadcrumb={breadcrumb} />
                    <div className='border bg-card text-card-foreground shadow rounded-lg border-none mt-6 p-6 min-h-[calc(100vh-56px-64px-20px-24px-56px)]'>
                        <Outlet />
                    </div>
                </div>
            </main>
            <footer
                className={cn(
                    'transition-[margin-left] ease-in-out duration-300',
                    isOpenSidebar === false ? 'lg:ml-[90px]' : 'lg:ml-72'
                )}
            >
                <Footer />
            </footer>
        </>
    );
});
