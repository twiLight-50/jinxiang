<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <JxBreak>
        <JxBreakItem :to="{ path: '/' }">首页</JxBreakItem>
        <Transition class="fade-right" mode="out-in">
          <JxBreakItem :key="topCategory.id">{{
            topCategory.name
          }}</JxBreakItem>
        </Transition>
      </JxBreak>
      <!-- 轮播图 -->
      <JxCarousel auto-play :sliders="sliders" style="height: 500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <router-link :to="`/category/sub/${item.id}`">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <!-- <p class="tag">{{ sub.desc }}</p> -->
          <JxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <GoodsItem
            v-for="goods in sub.goods"
            :key="goods.id"
            :goods="goods"
          />
          <!-- {{ goods }} -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, ref, watch } from "vue";
import { findBanner } from "@/api/home";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import GoodsItem from "./components/goods-item.vue";
import { findTopCategory } from "@/api/category";
export default {
  name: "TopCategory",
  components: { GoodsItem },
  setup() {
    const sliders = ref([]);
    findBanner().then((data) => {
      sliders.value = data.result;
    });

    const store = useStore();
    const route = useRoute();
    const topCategory = computed(() => {
      let cate = {};

      // 当前顶级分类===根据路由上的ID去vuex中的category模块的list中查找
      const item = store.state.category.list.find((item) => {
        return item.id === route.params.id;
      });
      if (item) cate = item;
      return cate;
    });

    // 获取各个子类目
    const subList = ref([]);
    const getSubList = () => {
      findTopCategory(route.params.id).then((data) => {
        subList.value = data.result.children;
      });
    };
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/${newVal}` === route.path) getSubList();
      },
      { immediate: true }
    );
    return { sliders, topCategory, subList };
  },
};
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @JxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .Jx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>