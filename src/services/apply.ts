import request from '@/utils/request';

export async function reqProjects(data: any, options?: any): Promise<API.Res> {
  return request('/v1/register/getProjects', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

export async function reqApply(data: any, options?: any): Promise<API.Res> {
  return request('/v1/register/apply', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

// 队员信息列表
export async function reqApplyList(data: any, options?: any): Promise<API.Res> {
  return request('/v1/getSubmemberList', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

//添加队员信息信息
export async function reqApplyAdd(data: any, options?: any): Promise<API.Res> {
  return request('/v1/addSubmember', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

//编辑队员信息信息
export async function reqApplyEditor(data: any, options?: any): Promise<API.Res> {
  return request('/v1/editSubmember', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

// 删除reqApplyDel
export async function reqApplyDel(data: any, options?: any): Promise<API.Res> {
  return request('/v1/delSubmember', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

// 查询状态
export async function reqApplyRegistered(data: any, options?: any): Promise<API.Res> {
  return request('/v1/hasRegistered', {
    method: 'post',
    data,
    ...(options || {}),
  });
}

// 上传
export async function reqUpload(data: any, options?: any): Promise<API.Res> {
  return request('/v1/pc/upload', {
    method: 'post',
    data,
    headers: {},
    ...(options || {}),
  });
}
