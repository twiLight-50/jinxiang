<template>
  <div class="app-header-sticy" :class="{show:y>=78}">
    <div class="container" v-show="y>=78">
      <router-link to="/" class="logo"></router-link>
      <AppHeaderNav />
      <div class="right">
        <router-link to="/">品牌</router-link>
        <router-link to="/">专题</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderNav from "@/components/app-header-nav.vue";
import { useWindowScroll } from '@vueuse/core'
export default {
  name: "AppHeaderSticky",
  components: { AppHeaderNav },
// 使用vueuse/core库
setup(){
  const {y}=useWindowScroll()
  return {y}
}
  // setup(){
  //   const y=ref(0);
  //   onMounted(()=>{
  //     window.onscroll=()=>{
  //      const scrollTop=document.documentElement.scrollTop;
  //      y.value=scrollTop;
  //      console.log(y);
  //     }
      
  //   })
  //   return {
  //     y,
  //   }
  // }
};
</script>

<style scoped lang="less">
.app-header-sticy {
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  transform: translateY(-100%);
  background-color: #fff;
  border: 1px solid #e4e4e4;
  opacity: 0; 
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(@/assets/images/logo.png) no-repeat right 2px;
    background-size:160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @JxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @JxColor;
      }
    }
  }
}
</style>