import request from '@/utils/request';

export async function reqDetailsPay(data?: any, options?: any) {
  return request('/v1/createAnOrder', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

//查询订单
export async function reqOrderDetail(data?: any, options?: any) {
  return request('/v1/getOrderDetail', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
