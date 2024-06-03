import axios from 'axios';
import statusHandler from './statusHandler';
import Toast from 'react-native-toast-message';

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log('======> this is critical error ', error);
    Toast.show({
      type: 'error',
      text1: error.message,
      // props: { uuid: 'bba1a7d0-6ab2-4a0a-a76e-ebbe05ae6d70' }
    });
    statusHandler(error);
    return Promise.reject(error);
  },
);

export default axios;
