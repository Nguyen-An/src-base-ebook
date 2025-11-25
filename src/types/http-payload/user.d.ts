import { PagingResponse } from '../http';
import { User } from '../user';

export interface GetUsersRequest {

}

export interface GetUsersResponse {
    elements: User[],
    pagination: PagingResponse
}
