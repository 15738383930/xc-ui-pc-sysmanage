import http from './../../../base/api/public'
import querystring from 'querystring'

export const page_list = (page, size, param) => {
  let stringify = querystring.stringify(param);
  return http.requestQuickGet('/test/vue/user/list/'+ page +'/' + size + '?' + stringify);
};

export const user_add = (user) => {
  return http.requestPost('/test/vue/user/add', user);
};

export const user_edit = (id, user) => {
  return http.requestPut('/test/vue/user/edit/'+ id, user);
};

// 根据人物id查询人物信息
export const user_get = id => {
  return http.requestQuickGet('/test/vue/user/get/' + id);
};
