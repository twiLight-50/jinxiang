
// 购物车模块
export default {
  state() {
    return {
      // 商品列表
      list: [],
    };
  },
  mutations: {
    inserCart(state, payload) {
      const sameIndex = state.list.findIndex(
        (goods) => goods.skuId === payload.skuId
      );
      if (sameIndex > -1) {
        const count = state.list[sameIndex].count;
        payload.count += count;
        // 删除原来
        state.list.splice(sameIndex, 1);
      }
      // 追加新的
      state.list.unshift(payload);
    },
  },
  action: {
    inserCart(ctx, payload) {
      return new Promise((resolve, reject) => {
        // 判断是否登录
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录
          ctx.commit('insertCart',payload)
          resolve()
        }
      });
    },
  },
};
