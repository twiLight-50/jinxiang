import { createRouter, createWebHashHistory } from "vue-router";

// 导入路由

const Layout = () => import("@/views/Layout");
const Home = () => import("@/views/home");
const TopCategory = () => import("@/views/category");

const SubCategory = () => import("@/views/category/sub.vue");
const Goods = () => import("@/views/goods");
const PageLogin=()=>import('@/views/login')
const LoginCallback = () => import('@/views/login/callback')
const routes = [
  // 一级路由
  {
    // name: 'layout',
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/category/:id",
        component: TopCategory,
      },
      {
        path: "/category/sub/:id",
        component: SubCategory,
      },
      {
        path: "/product/:id",
        component: Goods,
      },
    ],
  },{
    path:'/login',
    component:PageLogin
  },{
    path:'/login/callback',
    component:LoginCallback
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到顶部
  scrollBehavior() {
    // Vue2 x ,y控制
    // vue3 top ，left控制
    return { top: 0, left: 0 };
  },
});

export default router;
