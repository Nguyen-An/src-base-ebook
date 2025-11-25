import { Button } from '@/components/common/Button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/common/DropdownMenu';
import Table from '@/components/table/Table';
import { DEFAULT_PAGINATION } from '@/configs/constants';
import { ColumnDef, TableState, Updater } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';

export type Payment = {
    id: number,
    amount: number,
    status: 'pending' | 'processing' | 'success' | 'failed',
    email: string
};

export default function TablePage() {
    // variables
    const payments: Payment[] = Array.from({ length: 1000 }, (_, index) => ({
        id: index + 1,
        amount: (index + 1) * 100,
        status: 'pending',
        email: `email_${index + 1}@example.com`
    }));

    // state
    const [data, setData] = useState<Payment[]>([]);
    const [stateTable, setStateTable] = useState<TableState>({
        pagination: DEFAULT_PAGINATION
    } as TableState);

    // lifecycle
    useEffect(() => {
        getData(stateTable);
    }, []);

    // function
    const getData = ({ pagination: { pageIndex, pageSize } }: TableState) => {
        const minIndex = pageIndex * pageSize;
        const maxIndex = (pageIndex + 1) * pageSize - 1;
        const queryData = payments.filter((_, index) => minIndex <= index && index <= maxIndex);
        setData(queryData);
    };

    const onStateChange = (stateUpdater: Updater<TableState>) => {
        const newStateTable = stateUpdater instanceof Function ? stateUpdater(stateTable) : stateUpdater;
        getData(newStateTable);
        setStateTable(stateUpdater);
    };

    // columns
    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: 'id',
            header: 'ID'
        },
        {
            accessorKey: 'status',
            header: 'Status'
        },
        {
            accessorKey: 'email',
            header: 'Email'
        },
        {
            accessorKey: 'amount',
            header: 'Amount',
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue('amount'));
                const formatted = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                }).format(amount);

                return <div className='font-medium'>{formatted}</div>;
            }
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                const payment = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='h-8 w-8 p-0'>
                                <span className='sr-only'>Open menu</span>
                                <MoreHorizontal className='h-4 w-4' />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(payment.id.toString())}
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View customer</DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            }
        }
    ];

    return (
        <Table
            columns={columns}
            data={data}
            state={stateTable}
            rowCount={payments.length}
            onStateChange={onStateChange}
        />
    );
}
