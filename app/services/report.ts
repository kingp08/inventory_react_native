import { routes, post, get, deleteApi} from './index';

export interface TGetReports {
    id: string,
    name: string,
    code: string,
}

export interface TSetReport {
    name: string,
    code: string
}

export const setReport = (body: TSetReport, user: any) => {
    return post(`${routes.report}`, {body, user});
}

export const getReports = (user: any ) => {
    return get(`${routes.report}`, { user });
}


