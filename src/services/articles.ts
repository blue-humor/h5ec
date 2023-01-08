import request from '@/utils/request';

export async function reqAddArticle(data?: any, options?: any): Promise<API.Res> {
  return request('/v1/h5/addArticle', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

export async function reqEdit(data?: any, options?: any): Promise<API.Res> {
  return request('/v1/h5/updateArticle', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
export async function reqDel(data?: any, options?: any): Promise<API.Res> {
  return request('/v1/h5/delArticle', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
