<template>
  <Form ref="target" :validation-schema="mySchema" class="Jx-form" v-slot="{ errors }" autocomplete="off">
    <div class="Jx-form-item">
      <div class="field">
        <i class="icon iconfont icon-icon_user"></i>
        <Field name="account" :class="{err:errors.account}" v-model="form.account" class="input" type="text" placeholder="请输入用户名" />
      </div>
      <div v-if="errors.account" class="error">{{errors.account}}</div>
    </div>
    <div class="Jx-form-item">
      <div class="field">
        <i class="icon iconfont icon-shoujiduan"></i>
        <Field class="input" :class="{err:errors.mobile}" v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号" />
      </div>
      <div v-if="errors.mobile" class="error">{{errors.mobile}}</div>
    </div>
    <div class="Jx-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field class="input" :class="{err:errors.code}" v-model="form.code" name="form.code" type="text" placeholder="请输入验证码" />
        <span class="code" @click="send()" >{{time === 0 ? '发送验证码' : `${time}后重新发送` }}</span>
      </div>
      <div v-if="errors.code" class="error">{{errors.code}}</div>
    </div>
    <div class="Jx-form-item">
      <div class="field">
        <i class="icon iconfont icon-icon_lock"></i>
        <Field class="input" v-model="form.password" :class="{err:errors.password}" name="password" autocomplete="off" type="password"
          placeholder="请输入密码" />
      </div>
      <div v-if="errors.password" class="error">{{errors.password}}</div>
    </div>
    <div class="Jx-form-item">
      <div class="field">
        <i class="icon iconfont icon-icon_lock"></i>
        <Field class="input" v-model="form.rePassword" :class="{err:errors.rePassword}" name="rePassword" autocomplete="off" type="password"
          placeholder="请确认密码" />
      </div>
      <div v-if="errors.rePassword" class="error">{{errors.rePassword}}</div>
    </div>
    <a href="javascript:;" class="submit" @click="submit">立即提交</a>
  </Form>
</template>
  
<script>
import Schema from '@/utils/vee-validate-schema';
import { Form, Field } from 'vee-validate'
import Message from '@/components/library/Message'
import { useIntervalFn } from '@vueuse/core'
import { ref, onUnmounted, reactive } from 'vue'
import {userQQPatchCode,userQQPatchLogin} from '@/api/user'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  name: 'CallbackPatch',
  props: {
    unionld: {
      type: String,
      default: ''
    }
  },
  components: { Form, Field },
  setup(props) {
    const form = reactive({
      account: null,
      mobile: null,
      code: null,
      password: null,
      rePassword: null,
    })
    const mySchema = {
      account: Schema.accountApi,
      mobile: Schema.mobile,
      code: Schema.code,
      password: Schema.password,
      rePassword:Schema.rePassword
    }
    const target=ref(null)
    const time = ref(0)
    const { pause, resume } = useIntervalFn(() => {
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
      // console.log(form.mobile);
      const valid = mySchema.mobile(form.mobile)
      console.log(132);
      if (valid === true) {
        // 通过
        if (time.value === 0) {
          // 没有倒计时才可以发送
       await userQQPatchCode(form.mobile)
          Message({ type: 'success', text: '验证码发送成功' })
          time.value = 60
          resume()
        }
      } else {
        target.value.setFieldError('mobile', valid)
      }
    }

    // 完善信息
    const store = useStore()
    const router=useRouter()
    const submit = async () => {
      const valid =await target.value.validate()
      console.log(valid);
      if (valid) {
        userQQPatchLogin({
          unionId: props.unionId,
          ...form
        }).then(data => {
          // 实现和之前登录一样的逻辑
          // 1. 存储用户信息
          const { id, account, avatar, mobile, nickname, token } = data.result
          store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
          // 2. 跳转到来源页或者首页
          router.push(store.state.user.redirectUrl)
          // 3. 成功提示
          Message({ type: 'success', text: 'QQ完善信息成功' })
        }).catch(e => {
          // Message({ type: 'error', text: '完善信息失败' })
           if (e.response.data) {
            Message({ type: 'error', text: e.response.data.message })
            console.log(e.response.data.message);}
          // }
        })
      }
    }

    return {
      mySchema,  time, form,send,target,submit
    }
  }
}
</script>
  
<style scoped lang='less'>
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 90px;
  text-align: center;
  color: #999;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: rgba(189, 189, 189, .5);
  }
}
</style>