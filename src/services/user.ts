import request from '@/utils/request';

export async function reqUserInfo(data: any, options?: any): Promise<API.Res> {
  return request('/v1/getMemberInfo', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

export async function reqArticlelist(data: any, options?: any): Promise<API.Res> {
  return request('/v1/getMyArticleList', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
