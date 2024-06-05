// @ts-nocheck

/**
 * @description 记录常用接口
 * @author  erxiaownag
 * @license Apache-2.0
 * @update 2024-06-05
 */

/** 
 * @version 4.5.0
 * */
const platform='android'; //'ios'
const bundShortVersion='4.5.0';
const bundVersion='33603';
const UA=  `android(n960);bmw;${bundShortVersion}(${bundVersion});cn`


let USER_HEADERS = {
  "user-agent": "Dart/3.2 (dart:io)",
  'Content-Type': 'application/json; charset=utf-8',
  'Accept-Language': 'zh-CN',
  'x-user-agent': UA,
  "accept-language": "zh-CN",
  'host': SERVER_HOST,
  "x-cluster-use-mock": "never",
  "24-hour-format": "false",
  "x-identity-provider": "gcdm",
  "content-type": "application/json; charset=utf-8",
  "bmw-units-preferences":"d=KM;v=L;p=B;ec=KWH100KM;fc=L100KM;em=GKM",
  'x-raw-locale':"zh-Hans-CN",
};


/**
 *
 * @date 2024-06-05
 * @param {*} In 手機號|gcid
 * @return {*} 
 * @version 4.5.0
 */
function generateNonce(In) {
  const appVersion = "4.5.0";
  let nonce = "";
  const bet = "89762miosgyjpbkdlwaxchzuqefnrvt51304";
  function RandomNum(length) {
    return Array.from({ length }, () => bet[Math.floor(Math.random() * bet.length)]).join("");
  }
  let offest = 3, div = "#", sd = "a";
  const a1 = RandomNum(8),
    a2 = RandomNum(8);
  const k1 = bet[bet.length - 1 - bet.indexOf(a1.substr(offest, 1))],
    k2 = bet[bet.length - 1 - bet.indexOf(a2.substr(offest, 1))];
  const key = a1.substr(0, offest) + k1 + a1.substr(offest + 1) + a2.substr(0, offest) + k2 + a2.substr(offest + 1);
  let vi = RandomNum(16),
    b1 = vi.substr(0, 8),
    b2 = vi.substr(8, 8),
    a3 = RandomNum(8);
  const c1 = a2 + b1,
    c2 = a1 + b2;
  let StrIn = c1 + sd + CryptoJS.MD5(In).toString() + appVersion + In.substr(-4) + c2;
  const hash = CryptoJS.SHA256(StrIn).toString();
  const ts = new Date().toGMTString();
  StrIn = [In, ts, a3].join(div);
  const en = CryptoJS.enc.Hex.stringify(
    CryptoJS.AES.encrypt(
      StrIn, CryptoJS.enc.Utf8.parse(key),
      { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: CryptoJS.enc.Utf8.parse(vi) }
    ).ciphertext
  );
  nonce = c1 + hash.substr(0, 32) + en + c2 + hash.substr(32);
  return nonce;
}











  
  
  
      
      
      



  
      
