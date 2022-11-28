import request from '@/utils/request';

// const request = require('../../utils/request');

export async function reqAddressAdd(data?: any, options?: any) {
  return request('/v1/addressAdd', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
