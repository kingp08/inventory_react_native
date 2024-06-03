import { routes, post, get, put ,  deleteApi} from './index';
import { TItemInventoryPostBody, TItemInventoryPutBody } from '../store/itemSlice';

export const getItemBOMS = (user: any ) => {
    return get(`${routes.itemBOM}`, { user });
}

export const getRestockDetail = (user: any ) => {
    return get(`${routes.restockDetail}`, { user });
}

export const getItemInventories = (user: any, paramsObj?: any) => {
    return get(`${routes.itemInventory}`, { user, paramsObj});
}

export const setCurrentItemInventory = (body: TItemInventoryPostBody, user:any) => {
    return post(`${routes.itemInventory}`, {body, user});
}

export const putCurrentItemInventory = (body: TItemInventoryPutBody, itemId: string, user:any) => {
    return put(`${routes.itemInventory}${itemId}/`, {body, user});
}