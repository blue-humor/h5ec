import request from '@/utils/request';

// const request = require('../../utils/request');

export async function reqAddressAdd(data?: any, options?: any): Promise<API.Res> {
  return request('/v1/addressAdd', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

export async function reqAddressEdit(data?: any, options?: any): Promise<API.Res> {
  return request('/v1/addressEdit', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
