import request from '@/utils/request';

export async function reqCategory(data?: any, options?: any): Promise<API.Res> {
  return request('/shop/pc/getCategoryList', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
