import App from '@/App';
import { ROUTES } from '@/configs/constants';
import withAuthentication from '@/hooks/withAuthentication';
import withNonAuthentication from '@/hooks/withNonAuthentication';
import AdminPanelLayout from '@/layouts/AdminPanelLayout';
import FormPanelLayout from '@/layouts/FormPanelLayout';
import { ButtonPage, CalendarPage, DashboardPage, LoginPage, ModalPage, NotFoundPage, PaginationPage, ReactToastifyPage, TablePage, TabsPage, UserManagementPage } from '@/pages';
import ReadBook from '@/pages/read-book';
import { createBrowserRouter, redirect } from 'react-router-dom';

const AdminPanelLayoutWithAuthentication = withAuthentication(AdminPanelLayout);
const FormPanelLayoutWithNoneAuthentication = withNonAuthentication(FormPanelLayout);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                loader: () => redirect(ROUTES.dashboard.href)
            },
            {
                path: '/',
                element: <FormPanelLayoutWithNoneAuthentication />,
                children: [
                    {
                        path: ROUTES.login.href,
                        element: <LoginPage />
                    }
                ]
            },
            {
                path: '/',
                element: <AdminPanelLayoutWithAuthentication />,
                children: [
                    {
                        path: ROUTES.dashboard.href,
                        element: <DashboardPage />
                    },
                    {
                        path: ROUTES.readBook.href,
                        element: <ReadBook />
                    },
                    {
                        path: ROUTES.button.href,
                        element: <ButtonPage />
                    },
                    {
                        path: ROUTES.calendar.href,
                        element: <CalendarPage />
                    },
                    {
                        path: ROUTES.pagination.href,
                        element: <PaginationPage />
                    },
                    {
                        path: ROUTES.table.href,
                        element: <TablePage />
                    },
                    {
                        path: ROUTES.reactToastify.href,
                        element: <ReactToastifyPage />
                    },
                    {
                        path: ROUTES.modal.href,
                        element: <ModalPage />
                    },
                    {
                        path: ROUTES.tabs.href,
                        element: <TabsPage />
                    },
                    {
                        path: ROUTES.userManagement.href,
                        element: <UserManagementPage />
                    }
                ]
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    }
]);
