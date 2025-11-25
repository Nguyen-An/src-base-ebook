import { ScrollArea } from '@/components/common/ScrollArea';
import Tooltip from '@/components/common/Tooltip';
import { getMenuList } from '@/utils/routes';
import { cn } from '@/utils/utils';
import { EllipsisIcon, LogOutIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { WrapperSheetClose } from '../SheetMenu';
import { Button } from '@/components/common/Button';
import CollapseMenuButton from './CollapseMenuButton';
import { useStore } from '@/hooks/useStore';

interface MenuProps {
    isOpen?: boolean,
    useSheetClose?: boolean
}

export default function Menu({ isOpen, useSheetClose }: MenuProps) {
    // hooks
    const { t } = useTranslation();
    const { pathname } = useLocation();
    const menuList = getMenuList(pathname);

    // store
    const { authStore: { logout } } = useStore();

    return (
        <nav className='mt-8 h-full w-full px-2 flex flex-col justify-between'>
            <ScrollArea className='[&>div>div[style]]:!block'>
                <ul className='flex flex-col max-h-[calc(100vh-48px-36px-16px-32px-30px)] items-start space-y-1'>
                    {menuList.map(({ groupLabel, menus }, index) => (
                        <li
                            className={cn('w-full', groupLabel ? 'pt-5' : '')}
                            key={index}
                        >
                            {
                                (isOpen && groupLabel) || isOpen === undefined ?
                                    (
                                        <p className='text-sm font-medium text-muted-foreground px-4 pb-[7px] max-w-[248px] truncate'>
                                            {t(groupLabel)}
                                        </p>
                                    ) :
                                    (isOpen === false && groupLabel) ?
                                        (
                                            <Tooltip
                                                content={<p>{t(groupLabel)}</p>}
                                                triggerClassName='w-full'
                                                side='right'
                                            >
                                                <div className='w-full flex justify-center items-center'>
                                                    <EllipsisIcon className='h-5 w-5' />
                                                </div>
                                            </Tooltip>
                                        ) :
                                        (
                                            <p className='pb-2'></p>
                                        )
                            }
                            {
                                menus.map(({ href, label, icon: Icon, active, submenus }, index) => (
                                    submenus.length === 0 ?
                                        (
                                            <div className='w-full' key={index}>
                                                <Tooltip
                                                    content={isOpen === false && t(label)}
                                                    triggerAsChild={true}
                                                    side='right'
                                                >
                                                    <WrapperSheetClose useSheetClose={useSheetClose}>
                                                        <Button
                                                            variant={active ? 'secondary' : 'ghost'}
                                                            className='w-full justify-start h-10 mb-1'
                                                            asChild
                                                        >
                                                            <Link to={href}>
                                                                <span
                                                                    className={cn(isOpen === false ? '' : 'mr-4')}
                                                                >
                                                                    <Icon size={18} />
                                                                </span>
                                                                <p
                                                                    className={cn(
                                                                        'max-w-[200px] truncate',
                                                                        isOpen === false ?
                                                                            '-translate-x-96 opacity-0' :
                                                                            'translate-x-0 opacity-100'
                                                                    )}
                                                                >
                                                                    {t(label)}
                                                                </p>
                                                            </Link>
                                                        </Button>
                                                    </WrapperSheetClose>
                                                </Tooltip>
                                            </div>
                                        ) :
                                        (
                                            <div className='w-full' key={index}>
                                                <CollapseMenuButton
                                                    icon={Icon}
                                                    label={label}
                                                    active={active}
                                                    submenus={submenus}
                                                    isOpen={isOpen}
                                                    useSheetClose={useSheetClose}
                                                />
                                            </div>
                                        )
                                ))
                            }
                        </li>
                    ))}
                </ul>
            </ScrollArea>

            {/* logout button */}
            <ul>
                <li className='w-full grow flex items-end'>
                    <Tooltip
                        content={isOpen === false && t('words_title.sign_out')}
                        triggerAsChild={true}
                        side='right'
                    >
                        <Button
                            onClick={logout}
                            variant='outline'
                            className='w-full justify-start h-10'
                        >
                            <span
                                className={cn(
                                    'flex items-center transition-all overflow-hidden',
                                    isOpen === true ? 'mx-auto' : 'mx-0'
                                )}
                            >
                                <span>
                                    <LogOutIcon size={18} />
                                </span>
                                <p
                                    className={cn(
                                        'whitespace-nowrap ml-4 transition-opacity',
                                        isOpen === false ?
                                            'opacity-0 delay-150' :
                                            'opacity-100'
                                    )}
                                >
                                    {t('words_title.sign_out')}
                                </p>
                            </span>
                        </Button>
                    </Tooltip>
                </li>
            </ul>
        </nav>
    );
}
