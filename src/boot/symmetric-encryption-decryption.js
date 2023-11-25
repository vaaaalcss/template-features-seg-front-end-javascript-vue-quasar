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

function encryptData(data, encryptKey){
    let iv = getIv(16);

    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      CryptoJS.enc.Utf8.parse(encryptKey),
      {
        iv: CryptoJS.enc.Utf8.parse(iv)
      }
    ).toString();

    encrypted = encrypted + '|' + btoa(iv);

    console.log({encrypted});
    console.log({ decryptedLocal: decryptData(encrypted, 'oNSSASxLVso2ayG9gefIaDqn89y63z8C') });

    return encrypted;
}

function decryptData(data, encryptKey){
  const info = data.split('|');
  const encrypted = info[0];
  const iv = atob(info[1]);

  const decrypted = CryptoJS.AES.decrypt(
    encrypted,
    CryptoJS.enc.Utf8.parse(encryptKey),
    {
      iv: CryptoJS.enc.Utf8.parse(iv)
    }
  ).toString(CryptoJS.enc.Utf8);

  console.log({decrypted});

  return decrypted;
}

export default boot(async () => {
  const encryptApi = true;
  const encryptKey = 'oNSSASxLVso2ayG9gefIaDqn89y63z8C';

  api.interceptors.request.use(
    request => {
      if ( encryptApi === true ){
        if ( request && request.data ){
          const requestData = JSON.stringify(request.data);
          const encryptedData = encryptData(requestData, encryptKey);

          request.data = { 'encrypted': encryptedData };
        }

        if ( request && request.params ) {
          const requestParams = JSON.stringify(request.params);
          const encryptedParams = encryptData(requestParams, encryptKey);

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
          const decryptedData = decryptData(response.data.encrypted, encryptKey);
          response.data = JSON.parse(decryptedData);
        }
      }

      return response;
    },
    error => {
      return Promise.reject(error);
    }
  );
})