import { action, flow, makeObservable, observable } from 'mobx';
import RootStore from '.';
import BaseStore from './BaseStore';
import { getStorage, removeStorage, saveLocalStorage } from '@/utils/browsers';
import { AuthApi } from '@/apis';
import { ROUTES } from '@/configs/constants';
import { toastify } from '@/utils/toastify';
import { t } from 'i18next';
import { Profile } from '@/types/auth';
import { ResponseData } from '@/types/http';
import { LoginPostRequest, LoginPostResponse } from '@/types/http-payload/auth';

export default class AuthStore extends BaseStore {
    profile?: Profile;
    token: string = getStorage('token');
    api: AuthApi;

    constructor(rootStore: RootStore) {
        super(rootStore);
        makeObservable(this, {
            profile: observable,
            token: observable,
            login: flow.bound,
            logout: action.bound,
            getProfile: flow.bound,
            clearAuthentication: action.bound
        });
        this.api = new AuthApi();
    }

    *login(payload: LoginPostRequest) {
        try {
            const res: ResponseData<LoginPostResponse> = yield this.rootStore.apiStore.call(this.api, this.api.login, payload);
            if (res?.ok) {
                this.token = res.data.token;
                saveLocalStorage('token', res.data.token);
                toastify('success', t('messages.sign_in_success'));
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    *getProfile() {
        try {
            const res: ResponseData<Profile> = yield this.rootStore.apiStore.call(this.api, this.api.getProfile);
            if (res?.ok) {
                this.profile = res.data;
            }
        } catch (error) {
        }
    }

    logout() {
        try {
            this.rootStore.apiStore.call(this.api, this.api.logout);
            this.clearAuthentication();
        } catch (error) {
        }
    }

    clearAuthentication() {
        removeStorage(['token', 'profile']);
        window.location.href = ROUTES.login.href;
    }
}
