import { UserApi } from '@/apis';
import RootStore from '.';
import BaseStore from './BaseStore';
import { User } from '@/types/user';
import { flow, makeObservable, observable } from 'mobx';
import { GetUsersRequest, GetUsersResponse } from '@/types/http-payload/user';
import { ResponseData } from '@/types/http';
import { TableState } from '@tanstack/react-table';

export default class UserStore extends BaseStore {
    users: User[] = [];
    api: UserApi;

    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this, {
            users: observable,
            getUsers: flow.bound
        });
        this.api = new UserApi();
    }

    *getUsers(searchParams: GetUsersRequest, paging?: TableState) {
        try {
            const payload = { ...this.convertPagingFromTableToRequest(paging ?? this.paging), ...searchParams };
            const res: ResponseData<GetUsersResponse> = yield this.rootStore.apiStore.call(this.api, this.api.getUsers, payload);
            if (res.ok) {
                this.users = res.data.elements;
                this.paging = {
                    ...this.paging,
                    sorting: paging?.sorting ?? [],
                    pagination: this.convertPaginationFromRequestToTable(res.data.pagination)
                };
                this.totalRecord = res.data.pagination.totalRecord;
            }
        } catch (error) {
            console.log(error);
        }
    }

    clean(): void {
        super.clean();
        this.users = [];
    }
}
