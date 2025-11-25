import Paginate from '@/components/pagination/Paginate';
import PaginationCommon from '@/components/pagination/Pagination';
import { useState } from 'react';

export default function PaginationPage() {
    const [page, setPage] = useState<number>(1);

    return (
        <div className='flex flex-col gap-4'>
            <div>
                <p className='text-sm font-medium text-muted-foreground mb-1'>Full Pagination</p>
                <PaginationCommon
                    type='full-pagination'
                    currentPage={page}
                    totalRecords={50}
                    pageSize={5}
                    onPageChange={pageIndex => setPage(pageIndex)}
                />
            </div>
            <div>
                <p className='text-sm font-medium text-muted-foreground mb-1'>Short Pagination</p>
                <PaginationCommon
                    type='short-pagination'
                    currentPage={page}
                    totalRecords={50}
                    pageSize={5}
                    onPageChange={pageIndex => setPage(pageIndex)}
                />
            </div>
            <div>
                <p className='text-sm font-medium text-muted-foreground mb-1'>React Paginate</p>
                <Paginate
                    forcePage={page - 1}
                    pageCount={10}
                    onPageChange={({ selected }) => setPage(selected + 1)}
                />
            </div>
        </div>
    );
}
