import request from '@/utils/request';

export async function reqSwiper(data?: any, options?: any) {
  return request('/data/fetchAll', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

export async function reqGoodsList(data?: any, options?: any) {
  return request('/v1/getHomeGoodsList', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
