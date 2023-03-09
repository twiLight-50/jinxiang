<template>
  <div class="home-hot">
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <!-- 面板内容 -->
      <div ref="target">
        <ul class="goods-list" v-if="goods.length">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="">
              <img :src="item.picture" alt="" />
              <p>{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else />
      </div>
    </HomePanel>
  </div>
</template>

<script>
import { ref } from "vue";
import HomeSkeleton from "./home.skeleton.vue";
import HomePanel from "@/views/home/components/home.panel.vue";
import { useLazyData } from "@/hooks";
import { findHot } from "@/api/home";
export default {
  name: "HomeHot",
  components: { HomePanel, HomeSkeleton },
  setup() {
    // const goods = ref([]);
    // findHot().then((data) => {
    //   goods.value = data.result;
    // });
    // const target =ref(null)
    const { result, target } = useLazyData(findHot);
    // const goods=ref([])

    return { goods: result, target };
  },
};
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>