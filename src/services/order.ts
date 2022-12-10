import request from '@/utils/request';

export async function reqOrder(data: any, options?: any): Promise<API.Res> {
  return request('/v1/pc/getOrderList', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
