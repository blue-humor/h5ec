import request from '@/utils/request';

export async function reqGoodList(data?: any, options?: any) {
  return request('/goods/getGoodsList', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
