<template>
  <div class="Jx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checkbox-checked-o"></i>
    <i v-else class="iconfont icon-icon_Unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
  <script>
import { useVModel } from "@vueuse/core";
export default {
  name: "JxCheckbox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    // const checked = ref(false);
    // 使用useModel实现双向数据绑定V-model
    // 1.使用props接受modelValue
    // 2.使用useVModel来包装props中的modelValue属性数据
    // 3.在使用checked.value就是使用父组件数据
    // 4.在使用checked.value='数据'，赋值，触发emit('update:modelValue','数据')

    const checked = useVModel(props, "modelValue", emit);
    const changeChecked = () => {
      const newVal = !checked.value;
      // 通知父组件
      checked.value=newVal;
      // 支持change事件
      emit('change',newVal)
    };
    return {
      checked,
      changeChecked,
    };
  },
};
</script>
  <style scoped lang="less">
.Jx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checkbox-checked-o {
    color: @JxColor;
    ~ span {
      color: @JxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>