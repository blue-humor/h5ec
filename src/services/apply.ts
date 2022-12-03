import request from '@/utils/request';

export async function reqProjects(data: any, options?: any) {
  return request('/v1/register/getProjects', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
