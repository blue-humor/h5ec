import request from '@/utils/request';

export async function reqDetailsPay(data?: any, options?: any) {
  return request('/images/fetchAll', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
