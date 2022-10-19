import axios from "./axiosInstance";

import { useInfoStore } from "@/store";
const userInfo = useInfoStore();

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
  resetPassword: async (password, passwordRepeat) =>
    await axios({
      url: "/user/lostPwd/resetPwd",
      method: "POST",
      data: {
        email: userInfo.email,
        password,
        passwordRepeat,
      },
    }),
  getUserInfo: async () =>
    await axios({
      url: "/my/userinfo",
      method: "GET",
    }),
  changeUserInfo: async (username, email, avatar) =>
    await axios({
      url: "/my/userinfo",
      method: "POST",
      data: {
        username,
        email,
        avatar,
      },
    }),
};

export default api;
