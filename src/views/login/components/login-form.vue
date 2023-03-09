<template>
    <div class="account-box">
        <div class="toggle">
            <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
                <i class="iconfont icon-icon_user"></i> 使用账号登录
            </a>
            <a @click="isMsgLogin = true" href="javascript:;" v-else>
                <i class="iconfont icon-icon-msg"></i> 使用短信登录
            </a>
        </div>
        <Form ref="target" class="form" :validation-schema="schema" v-slot="{ errors }">
            <template v-if="!isMsgLogin">
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-icon_user"></i>
                        <Field :class="{ error: errors.account }" v-model="form.account" name="account" type="text"
                            placeholder="请输入用户名或手机号" />
                    </div>
                    <div class="error" v-if="errors.account">
                        <i class="iconfont icon-warning" />{{ errors.account }}
                    </div>
                </div>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-icon_lock"></i>
                        <Field :class="{ error: errors.password }" v-model="form.password" name="password"
                            type="password" placeholder="请输入密码" autocomplete="off" />
                    </div>
                    <div class="error" v-if="errors.password">
                        <i class="iconfont icon-warning" />{{ errors.password }}
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-icon_user"></i>
                        <Field :class="{error:errors.mobile}" v-model="form.mobile" name="mobile" type="text" placeholder="请输入手机号" />
                    </div>
                    <div class="error" v-if="errors.mobile">
                        <i class="iconfont icon-warning" />{{ errors.mobile }}
                    </div>
                </div>
                <div class="form-item">
                    <div class="input">
                        <i class="iconfont icon-icon_code"></i>
                        <Field name="code" :class="{error:errors.code}" v-model="form.code" type="password" placeholder="请输入验证码"
                            autocomplete="off" />
                        <span class="code" @click="send()">{{ time === 0 ? '发送验证码' : `${time}后重新发送` }}</span>
                    </div>
                    <div class="error" v-if="errors.code">
                        <i class="iconfont icon-warning" />{{ errors.code }}
                    </div>
                </div>
            </template>
            <div class="form-item">
                <div class="agree">
                    <Field as='JxCheckbox' name="isAgree" v-model="form.isAgree" />
                    <span>我已同意</span>
                    <a href="javascript:;">《隐私条款》</a>
                    <span>和</span>
                    <a href="javascript:;">《服务条款》</a>
                </div>
                <div class="error" v-if="errors.isAgree">
                    <i class="iconfont icon-warning" />{{ errors.isAgree }}
                </div>
            </div>
            <a @click="login" href="javascript:;" class="btn">登录</a>
        </Form>
        <div class="action">
            <!-- <span id="qqLoginBtn"></span> -->
            <a
                href="https://graph.qq.com/oauth2.0/show?which=Login&display=pc&client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback">
               <i class="iconfont icon-QQ-"></i></a>
            <div class="url">
                <a href="javascript:;">忘记密码</a>
                <a href="javascript:;">免费注册</a>
            </div>
        </div>
    </div>
</template>
<script>
import schema from '@/utils/vee-validate-schema'
import { reactive, ref, watch, onUnmounted} from 'vue'
import { Form, Field } from 'vee-validate'
import Message from '@/components/library/Message'
import { useStore } from 'vuex'
import { userAccountLogin, userMobileCode, userMobileLogin } from '@/api/user'
import { useRoute, useRouter, } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
import QC from 'qc'
export default {
    name: 'LoginForm',
    components: { Form, Field },
    setup() {
        const target = ref(null)
        const isMsgLogin = ref(false)
        const store = useStore()
        const route = useRoute();
        const router = useRouter()
        const form = reactive({
            isAgree: false,
            account: null,
            password: null,
            code: null,
            mobile: null
        })
        const mySchema = {
            account: schema.account,
            password: schema.password,
            mobile: schema.mobile,
            code: schema.code,
            isAgree: schema.isAgree
        }
        // 切换清空表单数据
        watch(isMsgLogin, () => {
            form.isAgree = true
            form.account = null
            form.password = null
            form.code = null
            form.mobile = null
        })

        // 整体表单校验
        const login = async () => {
            const valid = await target.value.validate()
            console.log(valid)

            // Message({type:'error',text:'用户名过密码错误'})
            if (valid) {
                try {
                    let data = null;

                    if (isMsgLogin.value) {
                        const { mobile, code } = form
                        data = await userMobileLogin({ mobile, code })
                    } else {
                        const { account, password } = form;
                        data = await userAccountLogin({ account, password })
                    }
                    // 存储用户信息
                    const { id, account, avatar, mobile, nickname, token } = data.result
                    store.commit('user/setUser', { id, account, avatar, mobile, nickname, token })
                    router.push(route.query.redirectUrl || '/');
                    // 登陆成功
                    Message({ type: 'success', text: "登录成功" })
                } catch (e) {
                    console.log(e)
                    // 登陆失败
                    if (e.response.data) {
                        Message({ type: 'error', text: e.response.data.message })
                        console.log(e.response.data.message);
                    }

                }
            }

        }
        const time = ref(0)
        const { pause, resume } = useIntervalFn(() => {
            time.value--
            if (time.value <= 0) {
                pause()
            }
        }, 1000, { immediate: false})
        onUnmounted(() => {
            pause()
        })

        // 发送短信
        const send = async () => {
            const valid = mySchema.mobile(form.mobile)
            if (valid === true) {
                // 通过
                if (time.value === 0) {
                    // 没有倒计时才可以发送
                    await userMobileCode(form.mobile)
                    //   Message({ type: 'success', text: '发送成功' })
                    time.value = 60
                    resume()
                }
            } else {
                target.value.setFieldError('mobile', valid)
            }
        }
        // onMounted(() => {
        //     // 组件渲染完毕，使用QC生成QQ登录按钮
        //     QC.Login({
        //         btnId: 'qqLoginBtn'
        //     })
        // })
        return {
            isMsgLogin,
            form,
            schema: mySchema,
            login,
            target, send,
            time,

        }
    },
}
</script>
<style scoped lang="less">
.account-box {
    .toggle {
        position: relative;
        padding: 15px 40px;
        text-align: right;

        a {
            color: @JxColor;

            i {
                font-size: 14px;
            }
        }
    }
.icon-QQ-{
    font-size: 35px;
    color:skyblue
}
    .form {
        padding: 0 40px;

        &-item {
            margin-bottom: 28px;

            .input {
                position: relative;
                height: 36px;

                >i {
                    width: 34px;
                    height: 34px;
                    background: #cfcdcd;
                    color: #fff;
                    position: absolute;
                    left: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 18px;
                }

                input {
                    padding-left: 44px;
                    border: 1px solid #cfcdcd;
                    height: 36px;
                    line-height: 36px;
                    width: 100%;

                    &.error {
                        border-color: @priceColor;
                    }

                    &.active,
                    &:focus {
                        border-color: @JxColor;
                    }
                }

                .code {
                    position: absolute;
                    right: 1px;
                    top: 1px;
                    text-align: center;
                    line-height: 34px;
                    font-size: 14px;
                    background: #f5f5f5;
                    color: #666;
                    width: 90px;
                    height: 34px;
                    cursor: pointer;
                }
            }

            >.error {
                position: absolute;
                font-size: 12px;
                line-height: 28px;
                color: @priceColor;

                i {
                    font-size: 14px;
                    margin-right: 2px;
                }
            }
        }

        .agree {
            a {
                color: #069;
            }
        }

        .btn {
            display: block;
            width: 100%;
            height: 40px;
            color: #fff;
            text-align: center;
            line-height: 40px;
            background: @JxColor;

            &.disabled {
                background: #cfcdcd;
            }
        }
    }

    .action {
        padding: 20px 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .url {
            a {
                color: #999;
                margin-left: 10px;
            }
        }
    }
}
</style>