import { routes, post, get, deleteApi} from './index';

export interface TGetStatus {
    id: string,
    name: string,
    code: string,
}

export const getStatus = (user: any ) => {
    return get(`${routes.status}`, { user });
}

export const deleteStatus = (id: string, user: any) => {
    return deleteApi(`${routes.status}${id}/`, {user});
}

