// /v1/likeIt

// 公共接口

import request from '@/utils/request';

export async function reqLikeIt(data?: any, options?: any): Promise<API.Res> {
  return request('/v1/likeIt', {
    method: 'post',
    data,
    ...(options || {}),
  });
}
