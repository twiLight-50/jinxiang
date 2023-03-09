<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a
        @click="toggle(-1)"
        :class="{ disabled: index === 0 }"
        href="javascript:;"
        class="iconfont icon-angleleft prev"
      ></a>
      <a
        @click="toggle(1)"
        :class="{ disabled: index === 1 }"
        href="javascript:;"
        class="iconfont icon-angle-right next"
      ></a>
    </template>

    <div ref="target" class="box">
      <ul
        class="list"
        v-if="brands.length"
        :style="{ transform: `translateX(${-index*1240}px)` }"
      >
        <li v-for="i in brands" :key="i.id">
          <RouterLink to="/">
            <img :src="i.picture" alt="" />
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton v-else />
    </div>
  </HomePanel>
</template>
  
  <script>
import { ref } from "vue";
import { useLazyData } from "@/hooks";
import HomeSkeleton from "./home.skeleton.vue";
import HomePanel from "./home.panel.vue";
import { findBrand } from "@/api/home";
export default {
  name: "HomeBrand",
  components: { HomePanel, HomeSkeleton },
  setup() {
    const index = ref(0);
    const toggle = (step) => {
      const newIndex = index.value + step;
      if (newIndex < 0 || newIndex > 1) return;
      index.value = newIndex;
    };
    // const brands = ref([]);
    const { target, result } = useLazyData(() => findBrand(10));
    console.log(result);
    return { brands: result, target, index, toggle };
    //     findBrand(10).then((data) => {
    //       brands.value = data.result;
    //     });
    //     console.log(brands);
    //     return{brands,index, toggle}
  },
};
</script>
  
  <style scoped lang='less'>
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @JxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>