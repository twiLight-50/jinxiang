<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory></HomeCategory>
      <!-- 轮播图 -->
      <HomeBanner></HomeBanner>
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew></HomeNew>
  <!-- 人气推荐 -->
  <HomeHot></HomeHot>
  <!-- 品牌推荐 -->
  <HomeBrand></HomeBrand>
  <!-- 产品分类 -->
  <HomeProduct></HomeProduct>
  <!-- 最新专题 -->
  <HomeSpecial></HomeSpecial>
</template>
<script>
import HomeCategory from "@/views/home/components/home-category.vue";
import HomeBanner from "@/views/home/components/home-banner.vue";
import HomeNew from "@/views/home/components/home-new.vue";
import HomeHot from "@/views/home/components/home-hot.vue";
import HomeBrand from "@/views/home/components/home-brand.vue";
import HomeProduct from "./components/home-product.vue";
import HomeSpecial from "@/views/home/components/home-special.vue";
export default {
  name: "HomePage",
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial,
  },
};
</script>

<style scoped lang="less">
</style>
