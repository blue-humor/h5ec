import request from '@/utils/request';

export async function reqCategory(data?: any, options?: any): Promise<API.Res> {
  return request('/category/getCategoryList', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
