import request from '@/utils/request';

export async function reqDetailsPay(data?: any, options?: any): Promise<API.Res> {
  return request('/v1/createAnOrder', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

//查询订单
export async function reqOrderDetail(data?: any, options?: any): Promise<API.Res> {
  return request('/v1/getOrderDetail', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

export async function reqProceedOrder(data?: any, options?: any): Promise<API.Res> {
  return request('/v1/proceedOrder', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
