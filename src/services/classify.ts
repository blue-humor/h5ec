import request from '@/utils/request';

export async function reqCategory(data?: any, options?: any) {
  return request('/category/getCategoryList', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
