import request from '@/utils/request';

export async function reqSwiper(data?: any, options?: any) {
  return request('/images/fetchAll', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

export async function reqGoodsList(data?: any, options?: any) {
  return request('/goods/getHomeGoodsList', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
