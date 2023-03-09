import { createStore } from 'vuex'
import { createVuexPersistedState } from "vue-persistedstate";

 
// 三个模块
import cart from './modules/cart'
import category from './modules/category'
import user from './modules/user'
// vue2.0创建仓库 new Vuex.store({})
// vue3.0创建仓库 createStore({})
export default createStore({
  namespaced:true,
  modules: {
    cart,
    user,
    category
  },
  plugins:[
    createVuexPersistedState({
    // 本地存储名字
    key:'鲸享',
    paths:['user','cart']
    })
  ]
})
