<template>
  <JxBreak>
    <JxBreakItem to="/">首页</JxBreakItem>
    <JxBreakItem
      :to="`/category/${category.top.id}`"
      :key="category.top.id"
      v-if="category.top"
      >{{ category.top.name }}</JxBreakItem
    >
    <JxBreakItem :key="category.sub.id" v-if="category.sub">{{
      category.sub.name
    }}</JxBreakItem>
  </JxBreak>
</template>
  <script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  name: "SubBreak",
  setup() {
    const store = useStore();
    const route = useRoute();
    const category = computed(() => {
      const cate = {};
      // 完成获取逻辑
      store.state.category.list.forEach((top) => {
        if (top.children) {
          let sub = top.children.find((sub) => sub.id === route.params.id);
          if (sub) {
            cate.top = { id: top.id, name: top.name };
            cate.sub = { id: sub.id, name: sub.name };
          }
        }
      });
      return cate;
    });
    console.log(category);
    return { category };
  },
};
</script>
  <style scoped lang="less"></style>