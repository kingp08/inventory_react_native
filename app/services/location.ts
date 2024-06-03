import { routes, post, get, deleteApi} from './index';

export interface TGetType {
    id: string,
    name: string,
}

export interface TSetType{
    name: string
}

export interface TSetLocationCountry {
    code: string, 
    type_id: string, 
    name: string, 
    description: string, 
    capacity: 1, 
    uom_id: string, 
    report_id: "",
    person_id_createdby: string, 
    person_id_updatedby: string, 
    status: string
}

export interface TSetLocationZone {
    code: string,
    name: string,
    description: string,
    capacity: string
}

export interface TSetLocationArea {
    code: string,
    name: string,
    description: string,
    capacity: string
}

export interface TSetLocationRow {
    code: string,
    name: string,
    description: string,
    capacity: string
}

export interface TSetLocationBin {
    code: string,
    name: string,
    description: string,
    capacity: string
}

export interface TGetLocationLevelParams {
    search?: string,
    status?: string,
}

export interface TGetLocationPositionParams {
    search?: string,
    status?: string,
}

export const setLocationCountry =(body: TSetLocationCountry, user: any) => {
    return post(`${routes.locationCountry}`, {body, user});
}

export const getLocationCountries = (user: any, paramsObj?: any) => {
    return get(`${routes.locationCountry}`, {paramsObj, user});
}

export const getLocationRegions = (user: any, paramsObj?: any) => {
    return get(`${routes.locationRegion}`, {paramsObj, user});
}

export const getLocationRegionTypes = (user: any) => {
    return get(`${routes.locationRegionType}`, {user});
}

export const getLocationWarehouses = (user: any, paramsObj?: any) => {
    return get(`${routes.locationWarehouse}`, {paramsObj, user});
}

export const getLocationBranches = (user: any, paramsObj?: any) => {
    return get(`${routes.locationBranch}`, {paramsObj, user});
}

export const setLocationZone =(body: TSetLocationZone, user: any) => {
    return post(`${routes.locationZone}`, {body, user});
}

export const getLocationZones =(user: any, paramsObj?: any) => {
    return get(`${routes.locationZone}`, {paramsObj, user});
}

export const setLocationArea =(body: TSetLocationArea, user: any) => {
    return post(`${routes.locationArea}`, {body, user});
}

export const getLocationAreas =(user: any, paramsObj?: any) => {
    return get(`${routes.locationArea}`, {paramsObj, user});
}

export const getLocationRooms =( user: any, paramsObj?: any) => {
    return get(`${routes.locationRoom}`, {paramsObj, user});
}

export const deleteLocationRoom = (id: string, user: any ) => {
    return deleteApi(`${routes.locationRoom}${id}/`, {user});
}

export const deleteLocationRoomType = (id: string, user: any ) => {
    return deleteApi(`${routes.locationRoomType}${id}/`, {user});
}

export const setLocationRow =(body: TSetLocationRow, user: any) => {
    return post(`${routes.locationRow}`, {body, user});
}

export const getLocationRows =(user: any, paramsObj?: any) => {
    return get(`${routes.locationRow}`, {paramsObj, user});
}

export const getLocationBays =(user: any, paramsObj?: any) => {
    return get(`${routes.locationBay}`, {paramsObj, user});
}

export const getLocationLevel =(user: any, paramsObj?: TGetLocationLevelParams) => {
    return get(`${routes.locationLevel}`, {paramsObj, user});
}

export const getLocationPosition =(user: any, paramsObj?: TGetLocationPositionParams) => {
    return get(`${routes.locationPosition}`, {paramsObj, user});
}

export const setLocationBin =(body: TSetLocationBin, user: any) => {
    return post(`${routes.locationBin}`, {body, user});
}

export const getLocationBins =(user: any, paramsObj?: any) => {
    return get(`${routes.locationBin}`, {paramsObj, user});
}

