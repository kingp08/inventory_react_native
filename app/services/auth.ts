import {routes, postLogin} from './index';

export const login = (body: any) => {
  return postLogin(`${routes.login}`, {body});
};
