import Table from '@/components/table/Table';
import { DEFAULT_SELECT_PAGE_SIZES } from '@/configs/constants';
import { useStore } from '@/hooks/useStore';
import { User } from '@/types/user';
import { ColumnDef, TableState, Updater } from '@tanstack/react-table';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

export default observer(function UserManagementPage() {
    // store
    const {
        userStore: { getUsers, users, paging, totalRecord, clean }
    } = useStore();

    // state
    const [rowSelected, setRowSelected] = useState({});

    // lifecycle
    useEffect(() => {
        onSearch();
    }, []);

    // function
    const onSearch = (searchParams?: any) => {
        clean();
        onFetchUser(searchParams);
    };

    const onFetchUser = (searchParams?: any, paging?: TableState) => {
        getUsers(searchParams, paging);
    };

    const onStateChange = (stateUpdater: Updater<TableState>) => {
        const newPaging = stateUpdater instanceof Function ? stateUpdater(paging) : stateUpdater;
        onFetchUser(undefined, newPaging);
    };

    // columns
    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            size: 50,
            enableSorting: false
        },
        {
            accessorKey: 'fullname',
            header: 'Fullname',
            size: 400
        },
        {
            accessorKey: 'email',
            header: 'Email',
            size: 400
        }
    ];

    return (
        <div>
            <Table
                columns={columns}
                data={users}
                state={{
                    ...paging,
                    rowSelection: rowSelected
                }}
                rowCount={totalRecord}
                onStateChange={onStateChange}
                selectPageSizes={[5, ...DEFAULT_SELECT_PAGE_SIZES]}
                enableRowSelection={true}
                onRowSelectionChange={setRowSelected}
                getRowId={row => row.id?.toString()}
            />
        </div>
    );
});
