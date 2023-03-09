<template>
  <div class="login-callback">
    <LoginHeader>QQ联合登陆</LoginHeader>
    <section class="container" v-if="isBand">
      <div class="unbind">
        <div class="loading"></div>
      </div>
    </section>
    <section class="container" v-else>
      <nav class="tab">
        <a @click="hasAccount = true" :class="{ active: hasAccount }" href="javascript:;">
          <i class="iconfont icon-link" />
          <span>已有鲸享账号，请绑定手机</span>
        </a>
        <a @click="hasAccount = false" :class="{ active: !hasAccount }" href="javascript:;">
          <i class="iconfont icon-edit1" />
          <span>没有鲸享账号，请完善资料</span>
        </a>
      </nav>
      <div class="tab-content" v-if="hasAccount">
        <CallbackBind :unionld="unionld" />
      </div>
      <div class="tab-content" v-else>
        <CallbackPatch :unionld="unionld" />
      </div>
    </section>
    <LoginFooter></LoginFooter>
  </div>
</template>
<script>
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'
import CallbackBind from './components/callback-bind.vue'
import CallbackPatch from './components/callback-patch.vue'
import { ref } from 'vue'
import Qc from 'qc'
import { userQQLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Message from '@/components/library/Message'
export default {
  name: 'LoginCallback',
  components: { LoginHeader, LoginFooter, CallbackBind, CallbackPatch },
  setup() {
    const hasAccount = ref(false);
    // 默认为真（有账号）
    const isBand = ref(true)
    const router = useRouter()
    const store = useStore()
    const unionld = ref(null)
    if (Qc.Login.check()) {
      // 第三方唯一标识QQ
      Qc.Login.getMe(openId => {
        // 请求后台做qq登录
        userQQLogin(openId).then(data => {
          unionld.value = openId
          // 登录成功：data.result用户信息、
          // 1.存储用户信息
          // 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          router.push(store.state.user.redirectUrl);
          Message({ type: 'success', text: 'QQ登录成功' })
        }).catch(e => {
          isBand.value = false
          Message({ type: 'error', text: 'QQ账号未绑定' })
        })
      })
    }
    return {
      hasAccount, isBand, unionld
    }
  }
}
</script>
<style scoped lang="less">
.container {
  padding: 25px 0;
  padding: 25px 0;
  position: relative;
  height: 730px;

  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;

    .loading {
      height: 100%;
      background: #fff url(@/assets/images/loading.gif) no-repeat center / 100px 100px;
    }
  }
}

.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;

  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;

    i {
      font-size: 22px;
      vertical-align: middle;
    }

    span {
      vertical-align: middle;
      margin-left: 4px;
    }

    &.active {
      color: @JxColor;
      border-color: @JxColor;
    }
  }
}

.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>