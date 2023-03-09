<template>
  <div class="Jx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: show === true }">
      <span v-if="!fullLocation" class="placeholder">请选择配送地址</span>
      <span v-else class="value">{{ fullLocation }}</span>
      <i class="iconfont icon-xiangxiajiantou"></i>
    </div>
    <div class="option" v-if="show">
      <template v-if="!loading">
        <span @click="changeCity(i)" class="ellipsis" v-for="i in currCity" :key="i.code">{{
        i.name
        }}</span>
      </template>
      <div class="loading" v-else></div>
    </div>
  </div>
</template>
<script>
import { computed, ref, reactive } from "vue";
import { onClickOutside } from "@vueuse/core";
import axios from "axios";
import { emit } from "process";
export default {
  name: "JxCity",
  props: {
    fullLocation: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const allCityData = ref([]);
    const loading = ref(false);
    const target = ref(null);
    // 控制select显示隐藏
    const show = ref(false);
    const changeResult = reactive({
      provinceCode: "",
      provinceName: "",
      cityCode: "",
      cityName: "",
      countyCode: "",
      countyName: "",
      fullLocation: "",
    });
    const open = () => {
      loading.value = true;
      show.value = true;
      //   获取地区数据
      getCityData().then((data) => {
        allCityData.value = data;
        loading.value = false;
        // console.log(allCityData.value);
      });
      for (const key in changeResult) {
        changeResult[key] = ''
      }
    };
    const close = () => {
      show.value = false;
    };
    const toggle = () => {
      show.value ? close() : open();
    };
    // 实现点击外侧收起面板
    onClickOutside(target, () => {
      show.value = false;
    });
    const currCity = computed(() => {
      let list = allCityData.value;
      if (changeResult.provinceCode && changeResult.provinceName) {
        list = list.find((p) => p.code === changeResult.provinceCode).areaList;
      }
      if (changeResult.cityCode && changeResult.cityName) {
        list = list.find((p) => p.code === changeResult.cityCode).areaList;
      }
      if (changeResult.countyCode && changeResult.countyName) {
        list = list.find((p) => p.code === changeResult.countyCode).areaList;
      }
      // TODO 根据点击的省份城市获取对应的列表
      //   console.log(currCity);
      return list;
    });
    const changeCity = (item) => {
      // 省份
      if (item.level === 0) {
        changeResult.provinceCode = item.code;
        changeResult.provinceName = item.name;
      }
      // 市
      if (item.level === 1) {
        changeResult.cityCode = item.code;
        changeResult.cityName = item.name;
      }
      // 区
      if (item.level === 2) {
        changeResult.counityCode = item.code;
        changeResult.countyName = item.name;
        changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countyName}`
        close()
        emit('change', changeResult)
      }
    };
    return {
      show,
      toggle,
      target,
      currCity,
      loading,
      changeCity
    };
  },
};
//   获取省市区数据函数
const getCityData = () => {
  // 数据:https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
  // 1.当本地没有缓存,发请求获取数据
  // 2.当本地有缓存,取出本地数据
  // 返回promise在then获取数据,这里可能是异步操作可能是同步操作
  return new Promise((resolve, reject) => {
    // 约定:数据存储在window上的cityData字段
    if (window.cityData) {
      resolve(window.cityData);
    } else {
      const url =
        "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json";
      axios.get(url).then((res) => {
        // 缓存
        window.cityData = res.data;
        resolve(window.cityData);
      });
    }
  });
};
</script>
<style scoped lang="less">
.Jx-city {
  margin-left: 20px;
  display: inline-block;
  position: relative;
  z-index: 400;

  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;

    &.active {
      background: #fff;
    }

    .placeholder {
      color: #999;
    }

    .value {
      color: #666;
      font-size: 12px;
    }

    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }

  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;

    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }

    >span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>