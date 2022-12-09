import request from '@/utils/request';

export async function reqHomeData(data: any, options?: any): Promise<API.Res> {
  return request('/v1/getHomeData', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
