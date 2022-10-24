import axios from "./axiosInstance";

import { useInfoStore } from "@/store";

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
  resetPassword: async (password, passwordRepeat) => {
    const userInfo = useInfoStore();
    return await axios({
      url: "/user/lostPwd/resetPwd",
      method: "POST",
      data: {
        email: userInfo.user.email,
        password,
        passwordRepeat,
      },
    });
  },
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
  createMyPage: async () =>
    await axios({
      url: "/userpage/create",
      method: "POST",
    }),
  getMyPageInfo: async () =>
    await axios({
      url: "/userpage/info",
      method: "GET",
    }),
  updateUserInfo: async (name, value) => {
    const userInfo = useInfoStore();
    return await axios({
      url: "/userpage/update",
      method: "POST",
      data: {
        upid: userInfo.user.upid,
        [name]: value,
      },
    });
  },
  getManageList: async (type, pageSize, pageCurr) =>
    await axios({
      url: "/manage/getList",
      method: "POST",

      data: {
        type,
        pageSize,
        pageCurr,
      },
    }),
  getPageDetails: async (mid) =>
    await axios({
      url: "/manage/getPageDetails",
      method: "POST",

      data: {
        mid,
      },
    }),
  updatePage: async (mid, title, content, type, author, banner_pic) =>
    await axios({
      url: "/manage/update",
      method: "POST",
      data: {
        mid,
        title,
        content,
        type,
        author,
        banner_pic,
      },
    }),
  createPage: async () =>
    await axios({
      url: "/manage/create",
      method: "POST",
    }),
  toBin: async (mid) =>
    await axios({
      url: "/manage/toBin",
      method: "POST",
      data: {
        mid,
      },
    }),
  getBinList: async (pageSize, pageCurr) =>
    await axios({
      url: "/manage/getBinList",
      method: "POST",
      data: {
        pageSize,
        pageCurr,
      },
    }),
  deleteCompletely: async (mid) =>
    await axios({
      url: "/manage/delete",
      method: "POST",
      data: {
        mid,
      },
    }),
  getCourseList: async (pageSize, pageCurr, cid, cname, is_open, tname, type) =>
    await axios({
      url: "/course/getCourseList",
      method: "POST",
      data: {
        pageSize,
        pageCurr,
        cid,
        cname,
        is_open,
        tname,
        type,
      },
    }),
  addCourse: async (is_open, cname, credit, tname, tid, type) =>
    await axios({
      url: "/course/create",
      method: "POST",
      data: {
        is_open,
        cname,
        credit,
        tname,
        tid,
        type,
      },
    }),
};

export default api;
