<template>
  <ul class="app-header-nav">
    <li><router-link to="/">首页</router-link></li>
    <li
      v-for="item in list"
      :key="item.id"
      @mouseenter="show(item)"
      @mouseleave="hide(item)"
    >
      <router-link :to="`/category/${item.id}`" @click="hide(item)">{{
        item.name
      }}</router-link>
      <div class="layer" :class="{open: item.open}">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <router-link :to="`/category/sub/${sub.id}`" @click="hide(item)">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "AppHeaderNav",
  setup() {
    const store = useStore();
    // 拿到list数据
    const list = computed(() => {
      return store.state.category.list;
    });
    console.log(list);
    // 二级类目显示隐藏
    const show = (item) => {
      store.commit("category/show", item.id);
    };
    const hide = (item) => {
      store.commit("category/hide", item.id);
    };
    return {
      list,
      show,
      hide,
    };
  },
};
</script>
<style scoped lang="less">
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 999;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: @JxColor;
        border-bottom: 1px solid @JxColor;
      }
      // 显示二级类目
      // > .layer {
      //   height: 132px;
      //   opacity: 1;
      // }
    }
  }
}
// 二级类名弹层
.layer {
  &.open {
    height: 132px;
    opacity: 1;
  }
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: @JxColor;
        }
      }
    }
  }
}
</style>
