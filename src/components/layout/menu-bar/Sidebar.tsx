import { observer } from 'mobx-react-lite';
import { cn } from '@/utils/utils';
import { useTranslation } from 'react-i18next';
import { useStore } from '@/hooks/useStore';
import SidebarToggle from './_components/SidebarToggle';
import { Button } from '@/components/common/Button';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/configs/constants';
import { PanelsTopLeftIcon } from 'lucide-react';
import Menu from './_components/Menu';

export default observer(function SideBar() {
    // hooks
    const { t } = useTranslation();

    // store
    const {
        uiStore: { isOpenSidebar }
    } = useStore();

    return (
        <aside
            className={cn(
                'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
                isOpenSidebar === false ? 'w-[90px]' : 'w-72'
            )}
        >
            <SidebarToggle />

            <div className='relative h-full flex flex-col px-3 py-4 shadow-md dark:shadow-zinc-800'>
                {/* Brand top */}
                <Button
                    className={cn(
                        'transition-transform ease-in-out duration-300 mb-1 h-9',
                        isOpenSidebar === false ?
                            'translate-x-1' :
                            'translate-x-0'
                    )}
                    variant='link'
                    asChild
                >
                    <Link
                        to={ROUTES.dashboard.href}
                        className='flex items-center gap-2'
                    >
                        <PanelsTopLeftIcon className='w-6 h-6 mr-1' />
                        <h1
                            className={cn(
                                'font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300',
                                isOpenSidebar === false ?
                                    '-translate-x-96 opacity-0 hidden' :
                                    'translate-x-0 opacity-100'
                            )}
                        >
                            {t('general.brand_name')}
                        </h1>
                    </Link>
                </Button>

                {/* Menu */}
                <Menu isOpen={isOpenSidebar} />
            </div>
        </aside>
    );
});
