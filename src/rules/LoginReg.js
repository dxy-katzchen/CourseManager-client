//注册规则
export const user_register_rule = {
  id: [
    { required: true, message: "学/工号不得为空", trigger: "blur" },
    { min: 12, max: 12, message: "学/工号需要为12位", trigger: "blur" },
  ],
  username: [
    { required: true, message: "用户名不得为空", trigger: "blur" },
    { min: 1, max: 12, message: "用户名为1-12位", trigger: "blur" },
  ],
  email: [
    { required: true, message: "邮箱不得为空", trigger: "blur" },
    { type: "email", message: "请填写正确的邮箱形式", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不得为空", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "密码需要为6-12位数字/字母",
      trigger: "blur",
    },
  ],
};
//登陆规则
export const user_login_rule = {
  id: [
    { required: true, message: "学/工号不得为空", trigger: "blur" },
    { min: 12, max: 12, message: "学/工号需要为12位", trigger: "blur" },
  ],
  password: [
    { required: true, message: "密码不得为空", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "密码需要为6-12位数字/字母",
      trigger: "blur",
    },
  ],
};

//忘记密码发邮箱规则
export const forget_check_email_rule = {
  email: [
    { required: true, message: "邮箱不得为空", trigger: "blur" },
    { type: "email", message: "请填写正确的邮箱形式", trigger: "blur" },
  ],
};
//忘记密码发送邮箱和验证码
export const forget_check_code_rule = {
  email: [
    { required: true, message: "邮箱不得为空", trigger: "blur" },
    { type: "email", message: "请填写正确的邮箱形式", trigger: "blur" },
  ],
  checkCode: [
    { required: true, message: "验证码不得为空", trigger: "blur" },
    { min: 6, max: 6, message: "请填写6位验证码", trigger: "blur" },
  ],
};

export const forget_reset_pwd_rule = {

  password: [
    { required: true, message: "密码不得为空", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "密码需要为6-12位数字/字母",
      trigger: "blur",
    },
  ],
  passwordRepeat: [
    { required: true, message: "确认密码不得为空", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "确认密码需要为6-12位数字/字母",
      trigger: "blur",
    },
  ],
};
