
//注册规则
export const user_register_role={
    id: [
      { required: true, message: "学/工号不得为空", trigger: "blur" },
      { min: 12, max: 12, message: "学/工号需要为12位", trigger: "blur" },
    ],
    username: [
      { required: true, message: "用户名不得为空", trigger: "blur" },
      { min: 1, max: 12, message: "用户名为1-12位", trigger: "blur" },
    ],
    email: [
      { required: true, message: "用户名不得为空", trigger: "blur" },
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
  }
//登陆规则
export const user_login_role={
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

  }