import request from '@/utils/request';

export async function reqOrder(data: any, options?: any) {
  return request('/order/getOrderList', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
