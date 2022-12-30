import request from '@/utils/request';

export async function reqHomeData(data: any, options?: any): Promise<API.Res> {
  return request('/data/getHomeData', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
