import request from '@/utils/request';

export async function reqDetails(data?: any, options?: any): Promise<API.Res> {
  return request('/v1/getGoodsDetail', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
