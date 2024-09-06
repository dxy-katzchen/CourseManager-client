//注册规则
export const user_register_rule = {
  id: [
    { required: true, message: "ID cannot be empty", trigger: "blur" },
    {
      min: 12,
      max: 12,
      message: "ID needs to be 12 digits",
      trigger: "blur",
    },
  ],
  username: [
    { required: true, message: "Username cannot be empty", trigger: "blur" },
    {
      min: 1,
      max: 12,
      message: "Username needs to be 1-12 digits",
      trigger: "blur",
    },
  ],
  email: [
    { required: true, message: "Email cannot be empty", trigger: "blur" },
    {
      type: "email",
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Password cannot be empty", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "Password needs to be 6-12 digits/letters",
      trigger: "blur",
    },
  ],
};
//登陆规则
export const user_login_rule = {
  id: [
    { required: true, message: "Student ID cannot be empty", trigger: "blur" },
    {
      min: 12,
      max: 12,
      message: "Student ID needs to be 12 digits",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "Password cannot be empty", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "Password needs to be 6-12 digits/letters",
      trigger: "blur",
    },
  ],
};

//忘记密码发邮箱规则
export const forget_check_email_rule = {
  email: [
    { required: true, message: "Email cannot be empty", trigger: "blur" },
    {
      type: "email",
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],
};
//忘记密码发送邮箱和验证码
export const forget_check_code_rule = {
  email: [
    { required: true, message: "Email cannot be empty", trigger: "blur" },
    {
      type: "email",
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],
  checkCode: [
    {
      required: true,
      message: "Verification code cannot be empty",
      trigger: "blur",
    },
    {
      min: 6,
      max: 6,
      message: "Please enter a 6-digit verification code",
      trigger: "blur",
    },
  ],
};

export const forget_reset_pwd_rule = {
  password: [
    { required: true, message: "Password cannot be empty", trigger: "blur" },
    {
      min: 6,
      max: 12,
      message: "Password needs to be 6-12 digits/letters",
      trigger: "blur",
    },
  ],
  passwordRepeat: [
    {
      required: true,
      message: "Confirm password cannot be empty",
      trigger: "blur",
    },
    {
      min: 6,
      max: 12,
      message: "Confirm password needs to be 6-12 digits/letters",
      trigger: "blur",
    },
  ],
};
