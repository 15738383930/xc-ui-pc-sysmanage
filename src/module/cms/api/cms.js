import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

export const page_list = (page, size, param) => {
  let stringify = querystring.stringify(param);
  return http.requestQuickGet(apiUrl + '/cms/page/list/'+ page +'/' + size + '?' + stringify);
};

export const site_all = () => {
  return http.requestQuickGet(apiUrl + '/cms/site/all');
};
