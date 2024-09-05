export const change_myinfo_rule = {
  email: [
    { required: true, message: "Email cannot be empty", trigger: "blur" },
    {
      type: "email",
      message: "Please enter a valid email address",
      trigger: "blur",
    },
  ],
  username: [
    { required: true, message: "Username cannot be empty", trigger: "blur" },
    {
      min: 1,
      max: 12,
      message: "Username needs to be 1-12 digits/letters",
      trigger: "blur",
    },
  ],
};
