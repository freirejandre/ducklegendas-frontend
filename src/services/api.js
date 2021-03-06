import axios from 'axios';
//import https from 'https';
import CryptoJS from 'crypto-js';
import { ROUTES } from 'utils/RoutePaths';
// import cert from 'assets/cert.pem';
// import privateKey from 'assets/private_key.pem';

const SECRETKEY = 'DUCKLEGENDAS';

export const isAuthenticated = () => {

  const decryptedData = decryptLogin();
  if(decryptedData){
    // console.log('ddasda',decryptedData.user.access_token)
    const token = decryptedData.user.access_token;
    const date = decryptedData.user.token_expirate;
    const dateToken = new Date(date);
    const dateNow = new Date();
    return (dateToken.getTime() > dateNow.getTime() ) ? `Bearer ${token}` : null;
  }
  return null; 
}

export function encryptLogin(data){
    const dataUser = CryptoJS.AES.encrypt(JSON.stringify(data),SECRETKEY);
    localStorage.setItem("user", dataUser);
    refreshAuthorization();
}

export function decryptLogin(){
  try {
    const decrypt = CryptoJS.AES.decrypt(localStorage.getItem("user"),SECRETKEY)
    return JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
  } catch (e) {
    return false;
  }
}

export const postRequest = (uri, body, config) => api.post(uri, body, config);

export const getRequest = (uri) => api.get(uri);

export const refreshAuthorization = () => {api.defaults.headers.Authorization = isAuthenticated();}

//export const baseUrl = 'https://ducklegendas.com/api/public/';
export const baseUrl = 'https://api.ducklegendas.com/';
//export const baseUrl = 'http://127.0.0.1:8000/';

// const httpsAgent = new https.Agent({
//   ca: [cert],
//   cert: cert,
//   key: privateKey
// });

const api = axios.create({
    baseURL: `${baseUrl}api`,
    headers:{
        Authorization: isAuthenticated(),
        Accept: '*/*'
    },
    //httpsAgent: httpsAgent
});

api.interceptors.response.use((response) => {
    return response.data;
}, function (error) {
    const errorResponse = {};
    if (error.response === undefined || error.response.status === 500) { // NETWORK ERROR
      errorResponse.error = ['Problema de conexão com o servidor, tente mais tarde!'];
    }else{
      if(error.response.status === 401){
        localStorage.clear();
        window.location.replace(`${window.location.origin}${ROUTES.LOGIN}`);
      }
      errorResponse.error = error.response.data.error;
    }
    
    return errorResponse;
});