import { routes, post, get, deleteApi} from './index';

export interface TGetType {
    id: string,
    name: string,
}

export interface TSetType{
    name: string
}

export const setType = (body: TGetType, user: any) => {
    return post(`${routes.type}`, {body, user});
}

export const getTypes = (user: any ) => {
    return get(`${routes.type}`, { user });
}

export const setSubType = (body: TSetType, user: any) => {
    return post(`${routes.subType}`, {body, user});
}

export const getSubTypes = (user: any ) => {
    return get(`${routes.subType}`, { user });
}

export const getCompanyType = (user: any) => {
    return get(`${routes.companyType}`, {user});
}

export const getLocationCountryType = (user: any) => {
    return get(`${routes.locationCountryType}`, {user});
}

export const getTransferType = (user: any) => {
    return get(`${routes.itemTransferType}`, {user});
}