import request from '@/utils/request';

// const request = require('../../utils/request');

export async function reqAddressList(data?: any, options?: any) {
  return request('/v1/addressList', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
// 删除
export async function reqAddressDel(data?: any, options?: any) {
  return request('/v1/addressDel', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
