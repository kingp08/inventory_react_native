import { routes, post, get, deleteApi} from './index';

export interface TGetEntityPerson {
    code?: string,
    first_name?: string,
    search?: string,
}

export interface TGetEntityCompany {
    search?: string,
}


export interface TGetEntityItemSKU {
    search?: string,
    status?: string,
    accessCode?: string,
}

export const getEntityPeople = (user: any, paramsObj?: TGetEntityPerson, ) => {
    return get(`${routes.entityPerson}`, {paramsObj, user});
}

export const getEntityCompany = ( user: any, paramsObj?: TGetEntityPerson,) => {
    return get(`${routes.entityCompany}`, {paramsObj, user});
}

export const getEntityEmbeddedDevice = (user: any) => {
    return get(`${routes.entityEmbeddedDevice}`, { user});
}
export const getSettingsPosition = (user: any) => {
    return get(`${routes.locationPosition}`, { user});
}

export const getEntityItemSKU = (user: any, paramsObj?: TGetEntityItemSKU,) => {
    return get(`${routes.entityItemSKU}`, {paramsObj, user});
}




