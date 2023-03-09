// 提供复用逻辑的函数
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";
/**
 * 数据懒加载
 * @param {Element} target -Dom对象
 * @params {Function} apiFn -API函数
 */
export const useLazyData = (apiFn) => {
  const result = ref([]);
  const target = ref(null);
  // stop 停止观察
  const { stop } = useIntersectionObserver(
    // 监听的目标元素
    target,
    ([{ isIntersecting }]) => {
      // isIntersecting 是否进入可视区
      if (isIntersecting) {
        stop();
        console.log(123);
        // 调用API函数获取数据
        apiFn().then((data) => {
          result.value = data.result;
        });
      }
    },
    // 配置选项，相交的比例大于0就触发
    {
      threshold: 0,
    }
  );
  return { result, target };
};
