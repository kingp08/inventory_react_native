import {AxiosRequestHeaders} from 'axios';
import apiClient from './api-client';

const BASE_URL = 'http://abakada.tech:89/honeycomb/';

const contentTypes: any = {
  json: 'application/json',
  mfd: 'multipart/form-data',
};

interface TPostBody {
  body: any;
  type?: string;
  user?: any;
}

interface TGetBody {
  paramsObj?: any;
  type?: string;
  user?: any;
}

// Base function for GET requests
const get = (
  route: string,
  {paramsObj = {}, user, type = 'json'}: TGetBody,
) => {
  let headers = {
    Accept: 'application/json',
  } as AxiosRequestHeaders;
  const searchParams = new URLSearchParams();
  let searchParamsString = '';

  if (user.refreshToken) {
    headers.Authorization = `Honeycomb ${user.refreshToken}`;
  }
  if (!user.refreshToken && route !== routes.login) {
    return;
  }

  if (paramsObj) {
    for (const key in paramsObj) {
      if (Object.hasOwnProperty.call(paramsObj, key)) {
        searchParams.append(key, paramsObj[key]);
      }
    }
    searchParamsString = searchParams.toString();
  }
  if (type !== '') {
    headers['Content-Type'] = contentTypes[type];
  }

  return apiClient({
    method: 'get',
    url:
      searchParamsString === ''
        ? `${BASE_URL}${route}`
        : `${BASE_URL}${route}?${searchParamsString}`,
    headers,
  });
  // return apiClient(`${BASE_URL}/${route}`);
};

const postLogin = async (
  route: string,
  {body, type = 'json', user = {}}: TPostBody,
) => {
  let headers = {
    Accept: 'application/json',
  } as AxiosRequestHeaders;
  console.log(
    'check post api :: url, body: ',
    `${body.url}honeycomb/${route}`,
    body,
  );

  if (user.refreshToken) {
    headers.Authorization = `Honeycomb ${user.refreshToken}`;
  }
  if (!user.refreshToken && route !== routes.login) {
    return;
  }
  if (type !== '') {
    headers['Content-Type'] = contentTypes[type];
  }
  return apiClient({
    method: 'post',
    url: `${body.url}honeycomb/${route}`,
    headers,
    data: body,
  });
};

// Base function for POST requests
const post = async (
  route: string,
  {body, type = 'json', user = {}}: TPostBody,
) => {
  const headers = {
    Accept: 'application/json',
  } as AxiosRequestHeaders;
  console.log('check post api :: url, body: ', `${BASE_URL}${route}`, body);

  if (user.refreshToken) {
    headers.Authorization = `Honeycomb ${user.refreshToken}`;
  }
  if (!user.refreshToken && route !== routes.login) {
    return;
  }
  if (type !== '') {
    headers['Content-Type'] = contentTypes[type];
  }
  return apiClient({
    method: 'post',
    url: `${BASE_URL}${route}`,
    headers,
    data: body,
  });
};

const put = async (
  route: string,
  {body, type = 'json', user = {}}: TPostBody,
) => {
  let headers = {
    Accept: 'application/json',
  } as AxiosRequestHeaders;
  console.log('check post api :: url, body: ', `${BASE_URL}${route}`, body);
  if (user.refreshToken) {
    headers.Authorization = `Honeycomb ${user.refreshToken}`;
  }
  if (!user.refreshToken && route !== routes.login) {
    return;
  }
  if (type !== '') {
    headers['Content-Type'] = contentTypes[type];
  }
  return apiClient({
    method: 'put',
    url: `${BASE_URL}${route}`,
    headers,
    data: body,
  });
};

const deleteApi = (
  route: string,
  {paramsObj = {}, user, type = 'json'}: TGetBody,
) => {
  let headers = {
    Accept: 'application/json',
  } as AxiosRequestHeaders;
  const searchParams = new URLSearchParams();
  let searchParamsString = '';

  if (user.refreshToken) {
    headers.Authorization = `Honeycomb ${user.refreshToken}`;
  }
  if (!user.refreshToken && route !== routes.login) {
    return;
  }
  if (paramsObj) {
    for (const key in paramsObj) {
      if (Object.hasOwnProperty.call(paramsObj, key)) {
        searchParams.append(key, paramsObj[key]);
      }
    }
    searchParamsString = searchParams.toString();
  }
  if (type !== '') {
    headers['Content-Type'] = contentTypes[type];
  }

  return apiClient({
    method: 'delete',
    url: `${BASE_URL}${route}`,
    headers,
  });
};

// Routes
const routes = {
  login: 'api/token/',
  getNews: 'api/news',
  perms: 'api/SettingsRolesAndPermissions/',
  permsPaginaged: 'api/SettingsRolesAndPermissionsPaginated/',
  currency: 'api/SettingsCurrency/',
  report: 'api/SettingsReports/',
  category: 'api/SettingsItemCategory/',
  subCategory: 'api/SettingsItemSubCategory/',
  type: 'api/SettingsItemType/',
  companyType: 'api/SettingsCompanyType/',
  subType: 'api/SettingsItemSubType/',
  uom: 'api/SettingsUOM/',
  handlingUnit: 'api/SettingsHandlingUnit/',
  status: 'api/SettingsStatus/',
  locationCountryType: 'api/SettingsLocationCountryType/',
  locationCountry: 'api/SettingsLocationCountry/',
  locationRegion: 'api/SettingsLocationRegion/',
  locationRegionType: 'api/SettingsLocationRegionType/',
  locationBranch: 'api/SettingsLocationBranch/',
  locationWarehouse: 'api/SettingsLocationWarehouse/',
  locationZone: 'api/SettingsLocationZone/',
  locationArea: 'api/SettingsLocationArea/',
  locationRoom: 'api/SettingsLocationRoom/',
  locationRoomType: 'api/SettingsLocationRoomType/',
  locationRow: 'api/SettingsLocationRow/',
  locationBay: 'api/SettingsLocationBay/',
  locationLevel: 'api/SettingsLocationLevel/',
  locationPosition: 'api/SettingsLocationPosition/',
  locationBin: 'api/SettingsLocationBin/',
  entityPerson: 'api/EntityPerson/',
  entityCompany: 'api/EntityCompany/',
  entityItemSKU: 'api/EntityItemSKU/',
  entityEmbeddedDevice: 'api/EntityEmbeddedDevice/',
  itemBOM: 'api/ItemBOM/',
  restockDetail: 'api/RestockDetails/',
  itemInventory: 'api/CurrentItemInventory/',
  itemTransferType: 'api/SettingsTransferType/',
  directLabelPrint: 'api/DirectLabelPrinting/',
};

export {routes, get, post, put, deleteApi, postLogin};

export {login} from './auth';
export {getNews} from './news';
export {setPerms} from './perms';
export {getCurrencies, setCurrency} from './currency';
export {getReports, setReport} from './report';
export {
  getCategories,
  setCategory,
  getSubCategories,
  setSubCategory,
} from './category';
export {
  getTypes,
  setType,
  getSubTypes,
  setSubType,
  getTransferType,
} from './type';
export {getUOMs, setUOM, getHandlingUnits, setHandlingUnit} from './unit';
export {getStatus, deleteStatus} from './status';
export {
  setLocationCountry,
  getLocationCountries,
  getLocationRegions,
  getLocationRegionTypes,
  getLocationWarehouses,
  getLocationBranches,
  setLocationZone,
  getLocationZones,
  setLocationArea,
  getLocationAreas,
  getLocationRooms,
  deleteLocationRoom,
  deleteLocationRoomType,
  setLocationRow,
  getLocationRows,
  getLocationBays,
  getLocationLevel,
  getLocationPosition,
  setLocationBin,
  getLocationBins,
} from './location';
export {
  getEntityPeople,
  getEntityCompany,
  getEntityEmbeddedDevice,
  getEntityItemSKU,
} from './entity';
export {getItemBOMS, getRestockDetail, getItemInventories} from './item';
export {setDirectLabelPrint} from './print';
