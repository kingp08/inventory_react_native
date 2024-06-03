import { routes, post, get, deleteApi} from './index';
import { TDirectLabelPrint } from '../store/printSlice';

export const setDirectLabelPrint = (body: TDirectLabelPrint, user: any) => {
    return post(`${routes.directLabelPrint}`, {body, user});
}

export const getDirectLabelPrints = (  user: any, paramsObj?: any) => {
    // ?id=40aac44a-ebb2-42c8-bfe5-16498b42b83e&perm_delete_settings=1
    return get(`${routes.directLabelPrint}`, { paramsObj, user });
}


