import { ROUTES } from '@/configs/constants';
import { GroupMenu, Route } from '@/types/routes';
import { AppWindowIcon, BellIcon, CalendarIcon, CaptionsIcon, Columns3Icon, GaugeIcon, RectangleHorizontalIcon, TableIcon, Users2Icon } from 'lucide-react';

// #region Title Page
export const getTitlePage = (pathname: string): string => {
    if (!pathname) {
        return '';
    }
    const findRoute = Object.values(ROUTES).find(value => value.href === pathname);
    return findRoute?.title ?? '';
};
// #rendregion

// #region Breadcrumb
const STATIC_ROUTES_BREADCRUMB: {
    [key: string]: Route[]
} = {
    [ROUTES.dashboard.href]: [ROUTES.dashboard],
    [ROUTES.button.href]: [ROUTES.button],
    [ROUTES.calendar.href]: [ROUTES.calendar],
    [ROUTES.pagination.href]: [ROUTES.pagination],
    [ROUTES.table.href]: [ROUTES.table]
};

export const getBreadcrumb = (pathname: string): Route[] => {
    if (!pathname) return [];
    switch (pathname) {
        case STATIC_ROUTES_BREADCRUMB.hasOwnProperty(pathname) && pathname:
            return STATIC_ROUTES_BREADCRUMB[pathname];

        default:
            return [];
    }
};
// #endregion

// #region Menu
export const getMenuList = (pathname: string): GroupMenu[] => {
    return [
        {
            groupLabel: '',
            menus: [
                {
                    href: ROUTES.dashboard.href,
                    label: ROUTES.dashboard.menuLabel,
                    active: pathname === ROUTES.dashboard.href,
                    icon: GaugeIcon,
                    submenus: []
                }
            ]
        },
        {
            groupLabel: 'Examples',
            menus: [
                {
                    href: ROUTES.button.href,
                    label: ROUTES.button.menuLabel,
                    active: pathname === ROUTES.button.href,
                    icon: RectangleHorizontalIcon,
                    submenus: []
                },
                {
                    href: ROUTES.calendar.href,
                    label: ROUTES.calendar.menuLabel,
                    active: pathname === ROUTES.calendar.href,
                    icon: CalendarIcon,
                    submenus: []
                },
                {
                    href: ROUTES.pagination.href,
                    label: ROUTES.pagination.menuLabel,
                    active: pathname === ROUTES.pagination.href,
                    icon: Columns3Icon,
                    submenus: []
                },
                {
                    href: ROUTES.table.href,
                    label: ROUTES.table.menuLabel,
                    active: pathname === ROUTES.table.href,
                    icon: TableIcon,
                    submenus: []
                },
                {
                    href: ROUTES.reactToastify.href,
                    label: ROUTES.reactToastify.menuLabel,
                    active: pathname === ROUTES.reactToastify.href,
                    icon: BellIcon,
                    submenus: []
                },
                {
                    href: ROUTES.modal.href,
                    label: ROUTES.modal.menuLabel,
                    active: pathname === ROUTES.modal.href,
                    icon: CaptionsIcon,
                    submenus: []
                },
                {
                    href: ROUTES.tabs.href,
                    label: ROUTES.tabs.menuLabel,
                    active: pathname === ROUTES.tabs.href,
                    icon: AppWindowIcon,
                    submenus: []
                },
                {
                    href: ROUTES.userManagement.href,
                    label: ROUTES.userManagement.menuLabel,
                    active: pathname === ROUTES.userManagement.href,
                    icon: Users2Icon,
                    submenus: []
                }
            ]
        }
    ];
};
// #endregion
