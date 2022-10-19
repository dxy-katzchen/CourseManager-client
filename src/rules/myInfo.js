export const change_myinfo_rule = {
  email: [
    { required: true, message: "邮箱不得为空", trigger: "blur" },
    { type: "email", message: "请填写正确的邮箱形式", trigger: "blur" },
  ],
  username: [
    { required: true, message: "用户名不得为空", trigger: "blur" },
    { min: 1, max: 12, message: "用户名为1-12位", trigger: "blur" },
  ],
};
