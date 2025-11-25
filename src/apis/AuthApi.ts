import ApiService from './ApiService';

export default class AuthApi extends ApiService {
    login(payload) {
        return this.post('login', payload);
    }

    logout() {
        return this.post('logout');
    }

    getProfile() {
        return this.get('profile');
    }
}
