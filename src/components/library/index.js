//扩展vue原有的功能：全局组件，自定义组件，挂在原型方法。注意：没有全局过滤器
// 这就是插件
import defualtImg from "@/assets/images/200.png";
// import JxSkeleton from "./Jx-skeleton.vue";
// import JxCarousel from "./Jx-carousel.vue";
// import JxMore from "./Jx.more.vue";
// import JxBreak from "./Jx-break.vue";
// import JxBreakItem from "./Jx-break-item.vue";
import Message from "./Message";
const importFn=require.context('./',false,/\.vue$/)

export default {
  install(app) {
    //在app上进行扩展，app提供component  directive函数
    // 如果要挂在原型  app.config.globalProperties方式
    // app.component(JxSkeleton.name, JxSkeleton);
    // app.component(JxCarousel.name, JxCarousel);
    // app.component(JxMore.name, JxMore);
    // app.component(JxBreak.name, JxBreak);
    // app.component(JxBreakItem.name, JxBreakItem);

// 根据keys批量注册
importFn.keys().forEach(path=>{
  const component=importFn(path).default
  // 进行组件注册
  app.component(component.name,component)
})


    defineDirective(app);
    // 定义一个原型
    // app.config.globalProperties.$message=Message;
  },
};

// 定义指令
const defineDirective = (app) => {
  // 1.图片懒加载指令v-lazy
  app.directive("lazy", {
    // vue3.0
    mounted(el, binding) {
      // 创建一个观察对象，来观察当前使用指令的元素
      const observe = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // 停止观察
            observe.unobserve(el);
            // 图片加载失败

            el.onerror = () => {
              el.src = defualtImg;
            };
            // 把指令的值设置给el的src属性，binding.value就是指令的值
            el.src = binding.value;
          }
        },
        {
          threshold: 0,
        }
      );
      // 开启观察
      observe.observe(el);
    },
  });
};
