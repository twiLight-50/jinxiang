<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template v-slot:right><JxMore path="/" /></template>
      <!-- 面板内容 -->
      <div ref="target" >
        <!-- {{goods.length}} -->
      <ul class="goods-list" v-if="goods.length">
        <li v-for="item in goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      
      <HomeSkeleton v-else/>
    </div>
    </HomePanel>
  </div>
</template>
<script>
import HomeSkeleton from './home.skeleton.vue'
import HomePanel from "@/views/home/components/home.panel.vue";
import { findNew } from "@/api/home";
import { useLazyData } from '@/hooks';
export default {
  name: "HomeNew",
  components: {
    HomePanel,
    HomeSkeleton,
  },
  setup() {
    // const goods = ref(0);
    // findNew().then((data) => {
    //   goods.value = data.result;
    // });
    // console.log(goods);

    // const target=ref(null);
    const {target ,result}=useLazyData( findNew)
    return {
      goods:result,
      target 
    };
  },
};
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>