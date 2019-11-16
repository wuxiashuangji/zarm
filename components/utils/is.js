// 判断类型 语句
const typeCheck = Object.prototype.toString;
const isFunc = something => typeCheck.call(something) === '[object Function]';
const isString = something => typeCheck.call(something) === '[object String]';
const isArray = something => typeCheck.call(something) === '[object Array]';
const isBoolean = something => typeCheck.call(something) === '[object Boolean]';
const isNumber = something => typeCheck.call(something) === '[object Number]';
const isObject = something => typeCheck.call(something) === '[object Object]';
const isUndefined = something => typeCheck.call(something) === '[object Undefined]';
// 浏览器判断集合
const os = function () {
  const ua = navigator.userAgent;

  const isWindowsPhone = /(?:Windows Phone)/.test(ua);

  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone;

  const isAndroid = /(?:Android)/.test(ua);

  const isFireFox = /(?:Firefox)/.test(ua);

  const isChrome = /(?:Chrome|CriOS)/.test(ua);

  const isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));

  const isPhone = /(?:iPhone)/.test(ua) && !isTablet;

  const isPc = !isPhone && !isAndroid && !isSymbian;

  const isWechat = /(MicroMessenger)/i.test(ua);

  const isUC = /(UCBrowser)/i.test(ua);

  const isIOS = /(iPhone|iPad|iPod|iOS)/i.test(ua);

  const isMobile = !isPc;

  const isAlipay = /Alipay/i.test(ua);

  const isUnionpay = /CloudPay/i.test(ua);

  const isHuaWei = /huawei/i.test(ua);

  const isOppo = /oppo/i.test(ua);

  const isQuark = /quark/i.test(ua);

  const isQQ = /qqbrowser/i.test(ua);

  return {
    isTablet,
    isPhone,
    isAndroid,
    isPc,
    isMobile,
    isUC, // UC浏览器
    isIOS,
    isWechat, // 微信内置浏览器
    isChrome,
    isAlipay, // 支付宝内置浏览器
    isUnionpay, // 云闪付内置浏览器
    isHuaWei, // 华为自带浏览器
    isOppo, // oppo自带浏览器
    isQuark, // 夸克浏览器
    isQQ, // QQ浏览器
  };
};

export {
  isFunc,
  isString,
  isArray,
  isBoolean,
  isNumber,
  isObject,
  isUndefined,
  os,
};
