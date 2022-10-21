import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "Index",
      component: () => import("@/pages/mainPage/index.vue"),
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

router.beforeEach((to, from, next) => {
  if (!localStorage.token) {
    if (to.name == "Login") next();
    else router.push({ name: "Login" });
  } else {
    next();
  }
});

export default router;
