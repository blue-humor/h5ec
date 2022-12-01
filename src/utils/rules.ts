export const login = {
  username: [{ required: true, message: '请填写用户名' }],
  password: [{ required: true, message: '请填写密码' }],
};

export const addressEditor = {
  phone: [
    {
      required: true,
      message: '手机号不能为空',
    },
    {
      max: 11,
      message: '手机号码最长11位!',
    },
    {
      pattern: /^1[3|4|5|6|7|8|9]\d{9}$/,
      message: '请输入正确的手机号',
    },
  ],
  name: [{ required: true, message: '请输入您的姓名' }],
  city: [{ required: true, message: '请选择您的所在地区' }],
};
