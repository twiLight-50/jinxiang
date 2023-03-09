
  <script>
import { h } from "vue";
export default {
  name: "JxBreak",
  render() {
    const items = this.$slots.default();
    const dymanicItems = [];
    items.forEach((item, i) => {
      dymanicItems.push(item);
      if (i < items.length - 1) {
        dymanicItems.push(h("i", { class: "iconfont icon-angle-right" }));
      }
    });
    return h("div", { class: "Jx-break" }, dymanicItems);
  },
};
</script>
  
  <style  lang='less'>
.Jx-break {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @JxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>