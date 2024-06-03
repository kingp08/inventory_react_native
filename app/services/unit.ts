import { routes, post, get, deleteApi} from './index';

export interface TGetUOMs {
    id: string,
    name: string,
    acronym: string,
}

export interface TSetUOM {
    name: string,
    acronym: string,
}

export interface TGetHandlingUnits {
    id: string,
    name: string,
    code: string,
    weight: string,
}

export interface TSetHandlingUnit {
    name : string,
    code : string,
    weight : string
}

export const setUOM = (body: TSetUOM, user: any) => {
    return post(`${routes.uom}`, {body, user});
}

export const getUOMs = (user: any ) => {
    return get(`${routes.uom}`, { user });
}

export const setHandlingUnit = (body: TSetHandlingUnit, user: any) => {
    return post(`${routes.handlingUnit}`, {body, user});
}

export const getHandlingUnits= (user: any, paramsObj?: any) => {
    return get(`${routes.handlingUnit}`, { paramsObj, user });
}


