import { LANGUAGES_SUPPORTED, LanguagesSupported } from '@/types/enums';
import { LanguageInfo } from '@/types/language';
import { Route } from '@/types/routes';
import { PaginationState } from '@tanstack/react-table';
import { enUS, vi } from 'date-fns/locale';

// #region Routes
enum RoutesKey {
    home,
    dashboard,
    readBook,
    login,
    button,
    calendar,
    pagination,
    table,
    reactToastify,
    modal,
    tabs,
    userManagement
};

export const ROUTES: Record<keyof typeof RoutesKey, Route> = {
    home: {
        href: '/',
        title: 'words_title.home',
        menuLabel: 'words_title.home',
        breadcrumbLabel: 'words_title.home'
    },
    dashboard: {
        href: '/dashboard',
        title: 'words_title.dashboard',
        menuLabel: 'words_title.dashboard',
        breadcrumbLabel: 'words_title.dashboard'
    },
    readBook: {
        href: '/read-book',
        title: 'words_title.readBook',
        menuLabel: 'words_title.readBook',
        breadcrumbLabel: 'words_title.readBook'
    },
    login: {
        href: '/login',
        menuLabel: ''
    },
    button: {
        href: '/button',
        title: 'Button',
        menuLabel: 'Button',
        breadcrumbLabel: 'Button'
    },
    calendar: {
        href: '/calendar',
        title: 'Calendar',
        menuLabel: 'Calendar',
        breadcrumbLabel: 'Calendar'
    },
    pagination: {
        href: '/pagination',
        title: 'Pagination',
        menuLabel: 'Pagination',
        breadcrumbLabel: 'Pagination'
    },
    table: {
        href: '/table',
        title: 'Table',
        menuLabel: 'Table',
        breadcrumbLabel: 'Table'
    },
    reactToastify: {
        href: '/react-toastify',
        title: 'React Toastify',
        menuLabel: 'React Toastify',
        breadcrumbLabel: 'React Toastify'
    },
    modal: {
        href: '/modal',
        title: 'Modal',
        menuLabel: 'Modal',
        breadcrumbLabel: 'Modal'
    },
    tabs: {
        href: '/tabs',
        title: 'Tabs',
        menuLabel: 'Tabs',
        breadcrumbLabel: 'Tabs'
    },
    userManagement: {
        href: '/users',
        title: 'User Management',
        menuLabel: 'User Management',
        breadcrumbLabel: 'User Management'
    }
};

// #endregion Routes

// #region Languages
export const DEFAULT_LANGUAGE: LanguagesSupported = LANGUAGES_SUPPORTED.English;

export const LANGUAGES_MAPPER: {
    english: LanguageInfo,
    vietnamese: LanguageInfo
} = {
    english: {
        code: LANGUAGES_SUPPORTED.English,
        fullname: 'words_title.english',
        shortName: 'EN',
        flag: 'gb',
        dateFns: enUS
    },
    vietnamese: {
        code: LANGUAGES_SUPPORTED.Vietnamese,
        fullname: 'words_title.vietnamese',
        shortName: 'VI',
        flag: 'vn',
        dateFns: vi
    }
};

// #endredion

// #region Dates

export const DATE_YMD = 'yyyy/MM/dd';

// #endregion

// #region Table

export const DEFAULT_SELECT_PAGE_SIZES: number[] = [10, 20, 50, 100, 200, 500, 1000];

export const DEFAULT_PAGINATION: PaginationState = {
    pageIndex: 0,
    pageSize: 5
};

// #endregion
