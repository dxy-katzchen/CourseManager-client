import axios from "axios";
import { useAuthStore } from "@/store";
import { ElMessage } from "element-plus";

const instance = axios.create({
  baseURL: "http://127.0.0.1:1111",
  timeout: 2000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    const uri = config.url;
    // 不以 /user/ 开头, 加 token
    if (!/$\/user\//.test(uri)) {
      const AuthStore = useAuthStore();
      config.headers.set("Authorization",  AuthStore.Auth);
    }
    return config;
  },
  (err) => {
    ElMessage.error("请求失败", err);
    return err;
  }
);
//响应拦截器
instance.interceptors.response.use(
  //这个地方打包的时候需要改一下
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
