<template>
  <!-- 顶部通栏 -->
  <!-- <NavBar /> -->
  <AppNavbar />
  <!-- 头部通栏 -->
  <AppHeader />
  <!-- 引入头部吸顶 -->
  <AppHeaderSticky/>
  <!-- 内容容器 -->
  <div class="main">
    <!-- 二级路由 -->
    <router-view></router-view>
  </div>
  <!-- <JxMore path="/test"></JxMore> -->
  <!-- 底部组件 -->
  <AppFoot/>
</template>

<script>
import AppNavbar from "@/components/app-navbar.vue";
import AppHeader from "@/components/app-header.vue";
import AppFoot from '@/components/app-footer.vue';
import { useStore } from 'vuex';
import AppHeaderSticky from "@/components/app-header-sticky.vue";
import JxMore from "@/components/library/Jx.more.vue";
export default {
  name: "Layout",
  components: { AppNavbar, AppHeader, AppFoot, AppHeaderSticky, JxMore },
  setup(){
    const store=useStore();
    store.dispatch('category/getList')
  }
};
</script>

<style>
</style>