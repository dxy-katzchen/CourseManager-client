import { createRouter, createWebHashHistory } from "vue-router";
import { useInfoStore } from "@/store";
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("@/pages/mainPage/index.vue"),
      children:[
        {
          path: "management",
          name: "Management",
          component: () => import("@/pages/Management/index.vue"),
        },
      ]
    },
    {
      path: "/editArticle",
      name: "EditArticle",
      component: () => import("@/pages/Management/editArticle.vue"),
      props: route => ({ mid: route.query.mid })
    },
    {
      path: "/userpage",
      name: "Userpage",
      component: () => import("@/pages/UserPage/index.vue"),
    },
    {
      path: "/myInfo",
      name: "MyInfo",
      component: () => import("@/pages/MyInfo/index.vue"),
    },
    {
      path: "/login",

      component: () => import("@/pages/LoginReg/index.vue"),
      children: [
        {
          path: "",
          name: "Login",
          component: () => import("@/pages/LoginReg/Login.vue"),
        },
        {
          path: "register",
          name: "Register",
          component: () => import("@/pages/LoginReg/Register.vue"),
        },
        {
          path: "forgetPassword",
          name: "ForgetPassword",
          component: () => import("@/pages/LoginReg/ForgetPassword.vue"),
        },
        {
          path: "reset",
          name: "Reset",
          component: () => import("@/pages/LoginReg/ResetPassword.vue"),
        },
      ],
    },
   
  ],
});

router.beforeEach((to, from) => {
  const userInfo = useInfoStore();
  if (
    userInfo.token ||
    ["Login", "Register", "ForgetPassword", "Reset"].includes(to.name)
  )
    return true;
  return { name: "Login" };
});

export default router;
