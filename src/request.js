// @ts-nocheck

/**
 * @description 记录常用接口，有时效性
 * @author  erxiaownag
 * @license Apache-2.0
 * 
 */


let USER_HEADERS = {
  "user-agent": "Dart/2.18 (dart:io)",
  'Content-Type': 'application/json; charset=utf-8',
  'Accept-Language': 'zh-CN',
  'x-user-agent': 'android(qp1a.190711.020.n960fxxs8fuc4);bmw;3.3.1(22432);cn',
  "accept-language": "zh-CN",
  host: "myprofile.bmw.com.cn",
  "x-cluster-use-mock": "never",
  "24-hour-format": "false",
  "x-identity-provider": "gcdm",
  "content-type": "application/json; charset=utf-8",
};

/**
 * JSON网络请求
 * @author  erxiaownag
 * @license Apache-2.0
 * @param  {object} options 配置对象
 * @param  {string} options.url 请求地址
 * @param  {'GET'|'POST'|'DELETE'} options.method 请求地址
 * @param  {object} options.headers 请求地址
 * @param  {object} options.body
 * @param  {'JSON'|'Image'} options.Mode
 * @return {Promise<object>}
 */
async function request(options) {
  let req = new Request(options.url);
  req.headers = options.headers;
  req.method = options.method;
  req.body = options.body;
  switch (options.Mode) {
    case 'Image':
    return req.loadImage();
    case "JSON":
    return req.loadJSON();
    default :
    console.warn("查看请求类型");
    break;
  }
}
/**
 * 獲得滑動驗證碼
 * @author  erxiaownag
 * @license Apache-2.0
 * @param   {string} phone 手機號
 * @return  {object} obj
 * 
 * @example 
 * {
  * "code": 0,
  * "data":
  * {
    * "verifyId": "",
    * "backGroundImg": "",
  * },
  * "description": "",
  * "error": false
 * } 
 */

async function sliderCaptcha(phone) {
  return await request({
    url : BMW_SERVER_HOST + '/eadrax-coas/v2/cop/slider-captcha',
    method : 'POST',
    headers : {
    ...USER_HEADERS
    },
    body : `{"mobile":"${phone}"}`,
    Mode : 'JSON'
  });
}
/**
 * 提交滑動驗證
 * @author  erxiaownag
 * @license Apache-2.0
 * @param   {string} position 
 * @param   {string} verifyId
 * @return  {object} obj
 */
async function checkCaptcha (position,verifyId) {
  return await request({
    url : BMW_SERVER_HOST + '/eadrax-coas/v1/cop/check-captcha',
    method : 'POST',
    headers : {
    ...USER_HEADERS
    },
    body : `{"position":${position.toFixed(2)},"verifyId":"${verifyId}"}`,
    Mode : 'JSON'
  });
}
/**
 * 產生nonce
 * @author  erxiaownag
 * @license Apache-2.0
 * @param   {string} In 手機號|gcid
 * @return  {string} 
 * 
 */
function generage_nonce(In){
  let nonce = '';
  const fm = FileManager.local();
  const CryptoJS = importModule(fm.joinPath(fm.libraryDirectory(), "crypto-js.js"));
  const bet = "01234abcdefghijklmnopqrstuvwxyz56789";
  function RandomNum(length) {
    return Array.from({ length }, () => bet[Math.floor(Math.random() * bet.length)]).join("");
  }
  const k1 = RandomNum(1),
  k2 = RandomNum(1),
  k3 = bet[bet.length - 1 - bet.indexOf(k1)],
  k4 = bet[bet.length - 1 - bet.indexOf(k2)],
  key = `${RandomNum(4)}${k1}${RandomNum(7)}${k2}${RandomNum(3)}`,
  a1 = `${key.substr(0, 4)}${k3}${key.substr(5, 3)}`,
  a2 = `${key.substr(8, 4)}${k4}${key.substr(13, 3)}`,
  vi = RandomNum(16),
  b1 = vi.substr(0, 8),
  b2 = vi.substr(8, 8),
  a3 = RandomNum(8);
  const c1 = `${a2}${b1}`,
  c2 = `${a1}${b2}`;
  let StrIn = `${c1}u3.3.1${In.substr(-4)}${c2}`;
  const vsOut = CryptoJS.SHA256(StrIn).toString();
  const date = new Date().getTime() - 8 * 60 * 60 * 1000;

  let f=new DateFormatter();
  f.locale ='en_US';
  f.dateFormat="EEE, dd MMM yyyy HH:mm:ss ";
  const today = `&${f.string(new Date(date))} GMT&`; 
  StrIn = In + today + a3;
  const en = CryptoJS.enc.Hex.stringify(
    CryptoJS.AES.encrypt(
    StrIn, CryptoJS.enc.Utf8.parse(key), 
    {mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7,iv: CryptoJS.enc.Utf8.parse(vi)}
    ).ciphertext
  );
  nonce = `${c1}${vsOut.substr(0,32)}${en}${c2}${vsOut.substr(32)}`;
  return nonce;
}
/**
 * @author erxiaowang
 * @param {object} options    对象
 * @param {string} options.m  mobile
 * @param {string} options.d  deviceId
 * @param {string} options.p  enpwd
 * @param {string} options.v  verifyId
 * @param {string} options.n  nonce
 * @return res
 * 
 * @example 
 * {
  * "code": number,
  * "data":
  * {
    * "refresh_token": "",
    * "gcid": "","usid": "",
    * "token_type": "",
    * "access_token": ""
  * },
  * "description": "",
  * "error": false
  * } 
 */
async function pdwlogin (options) {
  const{m,d,p,v,n}=options;
  const res = await request({
      url:  BMW_SERVER_HOST + '/eadrax-coas/v2/login/pwd',
      method :'POST',
      headers : {
      ...USER_HEADERS,
      'User-Agent' : `Dart/2.18 (dart:io)`,
      'x-raw-locale':"zh-CN",
      'x-login-nonce': n,
      },
      body : JSON.stringify({mobile: m, password: p, deviceId: d, verifyId: v}),
      Mode : 'JSON'
  });
  return res
}
/**
 * 刷新oken
 * @author  erxiaownag
 * @license Apache-2.0
 * @param   {string} gcid
 * @param   {string} refresh_token 
 * @return  {string} access_token 
 * 
 * @example 
 * {
  * "refresh_token": string,
  * "gcid": string,
  * "usid": string,
  * "token_type": string,
  * "access_token": string,
  * "expires_in": number
 * }
 */
async function rT(gcid,refresh_token) {
  let nonce =generage_nonce(gcid);
  const res = await request({
    url:  BMW_SERVER_HOST + '/eadrax-coas/v2/oauth/token',
    method :'POST',
    headers : {
    ...USER_HEADERS,
    'x-raw-locale':"zh-CN",
    'bmw-units-preferences':'d=KM;v=L',
    'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
    'x-login-nonce': nonce
    },
    body : 'grant_type=refresh_token&refresh_token='+refresh_token,
    Mode : 'JSON'
  });
  if (res.access_token !== undefined) {
    const {access_token, refresh_token} = res;
    Keychain.set(ACCESS_TOKEN, access_token);
    Keychain.set(REFRESH_TOKEN, refresh_token);
    Keychain.set(TOKEN_UPDATE_LAST_AT, String(new Date().valueOf()));
    return access_token;
  } else {
    return '';
  }
}
  
  
  
  
      
      
      
  
  
  
      