import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import ReactPaginate, { ReactPaginateProps } from 'react-paginate';
import { ButtonProps, buttonVariants } from '../common/Button';
import { cn } from '@/utils/utils';

interface PaginateProps extends ReactPaginateProps {
    size?: ButtonProps['size']
};

export default function Paginate({
    containerClassName,
    pageLinkClassName,
    activeLinkClassName,
    previousLinkClassName,
    previousLabel,
    nextLinkClassName,
    nextLabel,
    breakLabel,
    breakLinkClassName,
    disabledLinkClassName,
    size = 'icon',
    ...props
}: PaginateProps) {
    const paginateLinkClass = buttonVariants({
        variant: 'ghost',
        size
    });

    return (
        <ReactPaginate
            containerClassName={cn('flex flex-row items-center gap-1', containerClassName)}
            pageLinkClassName={cn(paginateLinkClass, pageLinkClassName)}
            activeLinkClassName={cn(
                buttonVariants({
                    variant: 'outline',
                    size
                }),
                activeLinkClassName
            )}
            previousLinkClassName={cn(paginateLinkClass, 'w-auto px-4 py-2 gap-1 pl-2.5', previousLinkClassName)}
            previousLabel={previousLabel ?? (
                <>
                    <ChevronLeft className='h-4 w-4' />
                    <span>Previous</span>
                </>
            )}
            nextLinkClassName={cn(paginateLinkClass, 'w-auto px-4 py-2 gap-1 pr-2.5', nextLinkClassName)}
            nextLabel={nextLabel ?? (
                <>
                    <span>Next</span>
                    <ChevronRight className='h-4 w-4' />
                </>
            )}
            breakLabel={breakLabel ?? (
                <>
                    <MoreHorizontal className='h-4 w-4' />
                    <span className='sr-only'>More pages</span>
                </>
            )}
            breakLinkClassName={cn('flex h-9 w-9 items-center justify-center', breakLinkClassName)}
            disabledLinkClassName={cn('opacity-50 pointer-events-none', disabledLinkClassName)}
            {...props}
        />
    );
}
