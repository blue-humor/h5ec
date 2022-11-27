// import request from '@/utils/request'

const request = require('../utils/request');

interface LoginParams {
  username: string;
  password: string;
}

export async function reqLogin(data: LoginParams, options?: any) {
  return request('/member/login', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
