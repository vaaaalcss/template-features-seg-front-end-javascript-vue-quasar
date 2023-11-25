import { boot } from 'quasar/wrappers'
import { api } from 'boot/axios'
import CryptoJS from 'crypto-js';

function getIv(length){
  const characters ='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let iv = '';
  const charactersLength = characters.length;

  for ( let i = 0; i < length; i++ ) {
    iv += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return iv;
}

function decrypt(data, secretKey){
    const info = data.split('|');
    const encrypted = info[0];
    const iv = atob(info[1]);

    const decrypted = CryptoJS.AES.decrypt(
      encrypted,
      CryptoJS.enc.Utf8.parse(secretKey),
      {
        iv: CryptoJS.enc.Utf8.parse(iv)
      }
    ).toString(CryptoJS.enc.Utf8);

    return decrypted;
}

function encrypt(data, secretKey){
    let iv = getIv(16);

    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      CryptoJS.enc.Utf8.parse(secretKey),
      {
        iv: CryptoJS.enc.Utf8.parse(iv)
      }
    ).toString();

    encrypted = encrypted + '|' + btoa(iv);

    return encrypted;
}

export default boot(async () => {
  const encryptApi = true;
  const secretKey = 'oNSSASxLVso2ayG9gefIaDqn89y63z8C';

  api.interceptors.request.use(
    request => {
      if ( encryptApi === true ){
        if ( request && request.data ){
          const requestData = JSON.stringify(request.data);
          const encryptedData = encrypt(requestData, secretKey);

          request.data = { 'encrypted': encryptedData };
        }

        if ( request && request.params ) {
          const requestParams = JSON.stringify(request.params);
          const encryptedParams = encrypt(requestParams, secretKey);

          request.params = { 'encryptedParams': encryptedParams };
        }
      }

      return request;
    },
    error => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    response => {
      if ( encryptApi === true ) {
        if ( response && response.data.encrypted ) {
          const decryptedData = decrypt(response.data.encrypted, secretKey);
          response.data = JSON.parse(decryptedData);
        }
      }

      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );
});