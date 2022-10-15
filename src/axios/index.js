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
};

export default api;
