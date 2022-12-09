import request from '@/utils/request';

export async function reqArticleList(data: any, options?: any): Promise<API.Res> {
  return request('/v1/getArticleList', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
