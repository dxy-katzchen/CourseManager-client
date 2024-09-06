import axios from "axios";

import { ElMessage } from "element-plus";
import { useInfoStore } from "@/store";

const instance = axios.create({
  baseURL: "http://127.0.0.1:89",
  //Server
  // baseURL: "/ccc/",
  timeout: 2000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    const uri = config.url;
    // does not start with /user/, add token
    if (!/$\/user\//.test(uri)) {
      const userInfo = useInfoStore();
      config.headers.set("Authorization", userInfo.token);
    }
    return config;
  },
  (err) => {
    ElMessage.error("Request Failed", err);
    return err;
  }
);

instance.interceptors.response.use(
  (res) => {
    if (res.data.status !== 0) {
      ElMessage.error(res.data.message);
    }
    return res.data;
  },
  (err) => {
    return err;
  }
);

export default instance;
