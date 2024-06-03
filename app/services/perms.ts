import { routes, post, get, deleteApi} from './index';

export interface TGetPerms {
    id?: string,
    perm_delete_settings?: number,
    search?: string,
}

export interface TDeletePerms {
    id: string
}

export const setPerms = (body: any, user: any) => {
    return post(`${routes.perms}`, {body, user});
}

export const getPerms = (  user: any, paramsObj?: TGetPerms,) => {
    // ?id=40aac44a-ebb2-42c8-bfe5-16498b42b83e&perm_delete_settings=1
    return get(`${routes.perms}`, { paramsObj, user });
}

export const deletePerms = (paramsObj: TDeletePerms, user: any) => {
    return deleteApi(`${routes.perms}`, { paramsObj, user });
}


