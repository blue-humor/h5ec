import request from '@/utils/request';

export async function reqAbouts(data: any, options?: any): Promise<API.Res> {
  return request('/v1/aboutus', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
