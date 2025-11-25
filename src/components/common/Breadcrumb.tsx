import {
    BreadcrumbRoot,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '@/components/ui/BreadcrumbUI';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from './DropdownMenu';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Route } from '@/types/routes';

interface BreadcrumbProps {
    maxShow?: number,
    breadcrumb: Route[]
}

export default function Breadcrumb({ breadcrumb, maxShow = 4 }: BreadcrumbProps) {
    // hooks
    const { t } = useTranslation();

    // variables
    let breadcrumbList: Array<Route | Route[]> = breadcrumb;
    let breadcrumbNav: Route[] = [];
    if (breadcrumb.length > maxShow) {
        breadcrumbNav = breadcrumb.slice(1, breadcrumbList.length - 2);
        breadcrumbList.splice(1, breadcrumbList.length - 3, breadcrumbNav);
    }

    // render
    if (breadcrumbList.length < 2) return <></>;

    return (
        <BreadcrumbRoot>
            <BreadcrumbList>
                {
                    breadcrumbList.map((breadcrumbItem, index) => (
                        <Fragment key={index}>
                            <BreadcrumbItem key={index}>
                                {
                                    breadcrumbItem instanceof Array ?
                                        (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className='flex items-center gap-1'>
                                                    <BreadcrumbEllipsis className='h-4 w-4' />
                                                    <span className='sr-only'>Toggle menu</span>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align='start'>
                                                    {
                                                        breadcrumbItem.map((breadcrumbItemChildren, indexChild) => (
                                                            <DropdownMenuItem key={indexChild}>
                                                                <BreadcrumbLink href={breadcrumbItemChildren.href}>
                                                                    {breadcrumbItemChildren.breadcrumbLabel && t(breadcrumbItemChildren.breadcrumbLabel)}
                                                                </BreadcrumbLink>
                                                            </DropdownMenuItem>
                                                        ))
                                                    }
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) :
                                        (
                                            index !== breadcrumbList.length - 1 ?
                                                (
                                                    <BreadcrumbLink href={breadcrumbItem.href}>
                                                        {breadcrumbItem.breadcrumbLabel && t(breadcrumbItem.breadcrumbLabel)}
                                                    </BreadcrumbLink>
                                                ) :
                                                (
                                                    <BreadcrumbPage>
                                                        {breadcrumbItem.breadcrumbLabel && t(breadcrumbItem.breadcrumbLabel)}
                                                    </BreadcrumbPage>
                                                )
                                        )
                                }
                            </BreadcrumbItem>
                            {
                                index !== breadcrumbList.length - 1 && <BreadcrumbSeparator />
                            }
                        </Fragment>
                    ))
                }
            </BreadcrumbList>
        </BreadcrumbRoot>
    );
}
