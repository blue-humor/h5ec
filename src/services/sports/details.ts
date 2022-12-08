import request from '@/utils/request';

export async function reqArticle(data: any, options?: any) {
  return request('/v1/getArticle', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
