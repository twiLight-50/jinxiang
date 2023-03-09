<template>
  <div class="home-banner">
    <JxCarousel auto-play :sliders="sliders"></JxCarousel>
  </div>
</template>

<script>
import { ref } from "vue";
import { findBanner } from "@/api/home";
export default {
  name: "HomeBanner",
  setup() {
    const sliders = ref([]);
    findBanner().then((data) => {
      return (sliders.value = data.result);
    });
    // console.log(sliders);
    return {
      sliders,
    };
  },
};
</script>

<style  scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
// 轮播图样视覆盖
.Jx-carousel {
  :deep(.carousel-btn.prev){
    left: 270px;
  }
  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
</style>