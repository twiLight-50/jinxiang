<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBreak></SubBreak>
      <!-- 分类筛选 -->
      <SubFilter @filter-change="filterChange"></SubFilter>
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="sortChange"></SubSort>
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
        <JxInfiniteLoading
          @infinite="getData"
          :loading="loading"
          :finished="finished"
        ></JxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import SubBreak from "./components/sub-break.vue";
import SubFilter from "./components/sub-filter.vue";
import SubSort from "./components/sub-sort.vue";
import GoodsItem from "./components/goods-item.vue";
import { useRoute } from "vue-router";
import { findSubCategoryGoods } from "@/api/category";
export default {
  name: "SubCategory",
  components: { SubBreak, SubFilter, SubSort, GoodsItem },
  setup() {
    const route = useRoute();
    const finished = ref(false);
    const loading = ref(false);
    const goodsList = ref([]);
    let reqParams = {
      page: 1,
      pageSize: 20,
    };
    const getData = () => {
      loading.value = true;
      // 设置二级分类的ID
      reqParams.categoryId = route.params.id;
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 获取数据成功
        if (result.items.length) {
          // 有数据就追加
          goodsList.value.push(...result.items);
          // 把page改成下一页页码
          reqParams.page++;
        } else {
          // 没有数据，代表加载完成
          finished.value = true;
        }
        loading.value = false;
      });
    };
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          finished.value = false;
          goodsList.value = [];
          reqParams = {
            page: 1,
            pageSize: 20,
          };
        }
      }
    );

    // 1.更改排序组建的筛选数据，重新请求
    const sortChange = (sortParams) => {
      finished.value = false;
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...sortParams };
      reqParams.page = 1;
      goodsList.value = [];
    };
    // 2.更改筛选组件的筛选数据，重新请求
    const filterChange = (filterParams) => {
      finished.value = false;
      reqParams = { ...reqParams, ...filterParams };
      reqParams.page = 1;
      goodsList.value = [];
    };
    return { getData, loading, finished, goodsList, sortChange, filterChange };
  },
};
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>