import { action, flow, makeObservable, observable } from 'mobx';
import RootStore from '.';
import BaseStore from './BaseStore';

export default class ReadBookStore extends BaseStore {
    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this, {
            clearAuthentication: action.bound
        });
        // this.api = new AuthApi();
    }

    clearAuthentication() {
    }
}
