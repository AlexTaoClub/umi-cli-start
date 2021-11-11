import request, { requestFile } from '@/utils/Request';

// 图片上传
export async function postUploadFile(params: any) {
  return requestFile('/admin/image/uploadImg', {
    method: 'POST',
    requestType: 'form',
    data: params,
    nosign: true,
  });
}

// 用户登陆
export async function getAdminToken(params: any) {
  return request('/auth/user/getAdminToken', {
    method: 'POST',
    data: { ...params },
    beroreUrl: '/apiLogin',
  });
}
