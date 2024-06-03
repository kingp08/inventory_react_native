import { routes, post, get, deleteApi} from './index';

export interface TGetCategories {
    id: string,
    name: string,
}

export interface TSetCategory {
    name: string
}

export const setCategory = (body: TSetCategory, user: any) => {
    return post(`${routes.category}`, {body, user});
}

export const getCategories = (user: any ) => {
    return get(`${routes.category}`, { user });
}

export const setSubCategory = (body: TSetCategory, user: any) => {
    return post(`${routes.subCategory}`, {body, user});
}

export const getSubCategories = (user: any ) => {
    return get(`${routes.subCategory}`, { user });
}


