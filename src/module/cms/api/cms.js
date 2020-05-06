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

// 新增页面
export const page_add = (params) => {
  return http.requestPost(apiUrl + '/cms/page/add', params);
};

// 根据页面id查询页面信息
export const page_get = id => {
  return http.requestQuickGet(apiUrl + '/cms/page/get/' + id);
};

// 修改页面
export function page_edit(pageId, params) {
  return http.requestPut(apiUrl + '/cms/page/edit/'+pageId, params);
}

// 删除页面
export function page_del(pageId) {
  return http.requestDelete(apiUrl + '/cms/page/del/'+pageId);
}
