//用户模块

export default {
  namespaced: true,
  state() {
    return {
      // 用户信息
      profile: {
        id: "",
        avatar: "",
        nickname: "",
        account: "",
        mobole: "",
        token: "",
      },
      //登陆后会跳路径
      redirectUrl:'/'
    };
  },
  mutations: {
    // 修改用户信息,payload就是用户信息对象
    setUser(state, payload) {
      state.profile = payload;
    },
    setRedirectUrl(state,url){
      state.redirectUrl=url
    }
  },
};
