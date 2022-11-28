import request from '@/utils/request';

// const request = require('../../utils/request');

export async function reqAddressList(data?: any, options?: any) {
  return request('/v1/addressList', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
