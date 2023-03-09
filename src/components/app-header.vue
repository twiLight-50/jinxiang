<template>
  <header class="app-header">
    <div class="container">
      <h1 class="logo"><RouterLink to="/">鲸享</RouterLink></h1>
      <!-- 头部样式 -->
      <AppHeaderNav></AppHeaderNav>

      <div class="search">
        <i class="iconfont icon-sousuo1"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <div class="cart">
        <a href="javascript:;" class="curr">
          <i class="iconfont icon-gouwuche1"></i><sup >2</sup>
        </a>
      </div>
    </div>
  </header>
</template>
  
  <script>
import AppHeaderNav from "./app-header-nav";
import AppHeaderCart from "./app-header-cart";
export default {
  name: "AppHeader",
  components: { AppHeaderNav, AppHeaderCart },
};
</script>
  
  <style scoped lang='less'>
.app-header {
  background: #fff;
  
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo {
    width: 200px;
    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url(../assets/images/logo.png) no-repeat center 18px / contain;
    }
  }
  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;
    .icon-sousuo1 {
      font-size: 18px;
      margin-left: 5px;
    }
    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
    
  }
  sup{
    display: inline-block;
      color: #fff;
      width: 18px;
      height:11px;
      text-align: center;
      line-height: 1;
      background-color: red;
      // border: 1px solid grey;
      border-radius: 40%;
    }
}
</style>
  