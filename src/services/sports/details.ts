import request from '@/utils/request';

export async function reqArticle(data: any, options?: any): Promise<API.Res> {
  return request('/v1/getArticle', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
