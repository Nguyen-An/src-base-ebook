import ApiService from './ApiService';

export default class AuthApi extends ApiService {
    getUsers(payload) {
        return this.get('users', payload);
    }
}
