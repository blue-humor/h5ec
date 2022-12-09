import wx from 'weixin-js-sdk';

/**
 * @description: 判断浏览器环境， miniProgram 微信小程序环境 ； wxWeb 微信浏览器环境； others 其他浏览器
 * @param {*}
 * @return {promise}
 * @author:
 */
export const getBrowserEnv = () => {
  return new Promise(resolve => {
    const ua: any = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      //微信环境下
      wx.miniProgram.getEnv((res: any) => {
        if (res.miniprogram) {
          // 小程序环境下逻辑
          resolve('miniProgram');
        } else {
          //非小程序环境下逻辑
          resolve('wxWeb');
        }
      });
    } else {
      resolve('others');
    }
  });
};
