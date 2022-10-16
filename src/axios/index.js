import axios from "./axiosInstance";

const api = {
  login: async (uid, password) =>
    await axios({
      url: "/user/login",
      method: "POST",
      data: {
        uid,
        password,
      },
    }),
  register: async (username, password, uid, email, role) =>
    await axios({
      url: "/user/register",
      method: "POST",
      data: {
        username,
        password,
        uid,
        email,
        role,
      },
    }),
  captcha: async () =>
    await axios({
      url: "/user/captcha",
      method: "GET",
    }),
  sendEmail: async (email) =>
    await axios({
      url: "/user/lostPwd/sendEmail",
      method: "POST",
      data: {
        email,
      },
    }),
  varify: async (email, checkCode) =>
    await axios({
      url: "/user/lostPwd/varify",
      method: "POST",
      data: {
        email,
        checkCode,
      },
    }),
};

export default api;