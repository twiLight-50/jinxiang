<template>
  <Form ref="target" class="Jx-form" :validation-schema="mySchema" autocomplete="off" v-slot="{ errors }">
    <div class="user-info">
      <img :src="avatar" />
      <p>Hi，{{ nickname }} 欢迎来鲸享，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="Jx-form-item">
      <div class="field">
        <i class="icon iconfont icon-shoujiduan"></i>
        <Field :class="{ err: errors.mobile }" v-model="form.mobile" name="mobile" class="input" type="text"
          placeholder="绑定的手机号" />
      </div>
      <div class="error" v-if="errors.mobile">{{ errors.mobile }}</div>
    </div>
    <div class="Jx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field :class="{ err: errors.code }" name="code" v-model="form.code" class="input" type="text"
          placeholder="短信验证码" />
        <span @click="send()" class="code">{{ time === 0 ? '发送验证码' : `${time}后重新发送` }}</span>
      </div>
      <div class="error" v-if="errors.code">{{ errors.code }}</div>
    </div>
    <a href="javascript:;" @click="Login()" class="submit">立即绑定</a>
  </Form>
</template>

  
<script>
import Qc from 'qc'
import schema from '@/utils/vee-validate-schema'
import { Form, Field } from 'vee-validate'
import { reactive, ref, onUnmounted } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import { userQQBind, userQQBindLogin } from '@/api/user'
import Message from '@/components/library/Message'
import { useStore } from 'vuex'
import {  useRouter } from 'vue-router'
export default {
  name: 'CallbackBind',
  props: {
    unionld: {
      type: String,
      default: ''
    }
  },
  components: { Form, Field },
  setup(props) {
    const avatar = ref('');
    const nickname = ref(null);
    const target = ref(null)
    const form = reactive({
      mobile: null,
      code: null
    })
    const mySchema = {
      mobile: schema.mobile,
      code: schema.code
    }
    if (Qc.Login.check()) {
      Qc.api('get_user_info').success(res => {
        // console.log(res);
        avatar.value = res.data.figureurl_1
        nickname.value = res.data.nickname
      })
    }

    const time = ref(0)
    const { pause, resume, isActive } = useIntervalFn(() => {
      time.value--
      if (time.value <= 0) {
        pause()
      }
    }, 1000, { immediate: false })
    onUnmounted(() => {
      pause()
    })

    // 发送短信
    const send = async () => {
      const valid = mySchema.mobile(form.mobile)
      console.log(valid);
      if (valid === true) {
        // 通过
        if (time.value === 0) {
          // 没有倒计时才可以发送
          await userQQBind(form.mobile)
          Message({ type: 'success', text: '验证码发送成功' })
          time.value = 60
          resume()
        }
      } else {
        target.value.setFieldError('mobile', valid)
      }
    }
    const store = useStore()
    const router=useRouter()
    // const route=useRoute()
    const Login = async () => {
      const valid = await target.valid.validata()
      if (valid) {
        userQQBindLogin({
          unionId: props.unionld,
          ...form
        }).then(data => {
          // 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          // 跳转来源页或首页
          router.push(store.state.user.redirectUrl);
          // 登陆成功
          Message({ type: 'success', text: "QQ登录成功" })
        }).catch(e => {
          console.dir(e);
          if (e.response.data) {
            Message({ type: 'error', text: e.response.data.message })
            console.log(e.response.data.message);
          }
        })
      }
    }
    return {
      avatar, nickname, form, mySchema, target, send, time, Login
    }
  }
}
</script>
  
<style scoped lang='less'>
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;

  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }

  p {
    padding-left: 10px;
  }
}

.code {
  position: absolute;
  text-align: center;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 90px;
  color: #999;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: rgba(189, 189, 189, .5);
  }
}
</style>