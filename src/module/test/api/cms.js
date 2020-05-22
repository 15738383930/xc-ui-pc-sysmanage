import http from './../../../base/api/public'
import querystring from 'querystring'

export const page_list = (page, size, param) => {
  let stringify = querystring.stringify(param);
  return http.requestQuickGet('/test/vue/user/list/'+ page +'/' + size + '?' + stringify);
};

export const user_add = (user) => {
  return http.requestPost('/test/vue/user/add', user);
};
