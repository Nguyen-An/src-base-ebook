import { Status } from './enums';

export interface User {
    id: number,
    fullname?: string,
    emai?: string,
    status?: Status,
    createdAt?: string,
    updatedAt?: string
}
