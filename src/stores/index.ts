import ApiStore from './ApiStore';
import AuthStore from './AuthStore';
import ModalStore from './ModalStore';
import UIStore from './UIStore';
import UserStore from './UserStore';

export default class RootStore {
    modalStore: ModalStore;
    apiStore: ApiStore;
    uiStore: UIStore;
    authStore: AuthStore;
    userStore: UserStore;

    constructor() {
        this.modalStore = new ModalStore();
        this.apiStore = new ApiStore(this);
        this.uiStore = new UIStore(this);
        this.authStore = new AuthStore(this);
        this.userStore = new UserStore(this);
    }
}
