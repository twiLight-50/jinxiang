<template>
  <HomePanel title="最新专题">
    <template v-slot:right><JxMore path="/" /></template>
    <div class="special-list" ref="target">
      <!-- {{goods}} -->
      <template v-if="goods.length">
        <div class="special-item" v-for="i in goods" :key="i.id">
          <RouterLink to="/">
            <img :src="i.cover" alt />
            <div class="meta">
              <p class="title">
                <span class="top ellipsis">{{ i.title }}</span>
                <span class="sub ellipsis">{{ i.summary }}</span>
              </p>
              <span class="price">&yen;{{ i.lowestPrice }}起</span>
            </div>
          </RouterLink>
          <div class="foot">
            <span class="like"
              ><i class="iconfont icon-shoucang"></i>{{ i.collectNum }}</span
            >
            <span class="view"
              ><i class="iconfont icon-liulan"></i>{{ i.viewNum }}</span
            >
            <span class="reply"
              ><i class="iconfont icon-pinglun"></i>{{ i.replyNum }}</span
            >
          </div>
        </div>
      </template>
      <template v-else>
        <JxSkeleton width="404px"  bg="#e4e4e4" height="380px" v-for="i in 3" :key="i" animated></JxSkeleton>
      </template>
    </div>
  </HomePanel>
</template>
  
  <script>
import { useLazyData } from "@/hooks";
import HomePanel from "./home.panel.vue";
import { findSpecial } from "@/api/home";
import JxSkeleton from "@/components/library/Jx-skeleton.vue";
export default {
  name: "HomeSpecial",
  components: { HomePanel, JxSkeleton },
  setup() {
    const { target, result } = useLazyData(findSpecial);
    return {
      goods: result,
      target,
    };
  },
};
</script>
  
  <style scoped lang='less'>
.home-panel {
  background: #f5f5f5;
}
.special-list {
  height: 380px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .special-item {
    width: 404px;
    background: #fff;
    .hoverShadow();
    a {
      display: block;
      width: 100%;
      height: 288px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .meta {
        background-image: linear-gradient(
          to top,
          rgba(0, 0, 0, 0.8),
          transparent 50%
        );
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 288px;
        .title {
          position: absolute;
          bottom: 0px;
          left: 0;
          padding-left: 16px;
          width: 70%;
          height: 70px;
          .top {
            color: #fff;
            font-size: 22px;
            display: block;
          }
          .sub {
            display: block;
            font-size: 19px;
            color: #999;
          }
        }
        .price {
          position: absolute;
          bottom: 25px;
          right: 16px;
          line-height: 1;
          padding: 4px 8px 4px 7px;
          color: @priceColor;
          font-size: 17px;
          background-color: #fff;
          border-radius: 2px;
        }
      }
    }
    .foot {
      height: 72px;
      line-height: 72px;
      padding: 0 20px;
      font-size: 16px;

      i {
        display: inline-block;
        width: 15px;
        height: 14px;
        margin-right: 5px;
        color: #999;
      }
      .like,
      .view {
        float: left;
        margin-right: 25px;
        vertical-align: middle;
      }
      .reply {
        float: right;
        vertical-align: middle;
      }
    }
  }
}
</style>