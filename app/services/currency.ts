import { routes, post, get, deleteApi} from './index';

export interface TGetCurrencies {
    id: string,
    name: string,
    code: string,
}

export interface TSetCurrency {
    name: string,
    code: string
}

export const setCurrency = (body: TSetCurrency, user: any) => {
    return post(`${routes.currency}`, {body, user});
}

export const getCurrencies = (user: any ) => {
    return get(`${routes.currency}`, { user });
}

