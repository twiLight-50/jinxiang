import { userAccountCheck } from "@/api/user";
export default {
  account(value) {
    if (!value) return "请输入用户名";
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return "字母开头且6-20个字符";
    return true;
  },
  async accountApi(value) {
    if (!value) return "请输入用户名";
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return "字母开头且6-20个字符";
    const data = await userAccountCheck(value);
    
    if (data.result.valid) return "用户名已存在";
    return true;
  },

  password(value) {
    if (!value) return "请输入密码";
    if (!/^[a-zA-Z0-9]\w{5,17}$/.test(value))
      return "以字母开头，长度在6~18之间，只能包含字母、数字和下划线";
    return true;
  },
  rePassword(value,{form}) {
    if (!value) return "请输入密码";
    if (!/^[a-zA-Z0-9]\w{5,17}$/.test(value))
      return "以字母开头，长度在6~18之间，只能包含字母、数字和下划线";
    if (value!==form.password) return "两次密码不一致";
    return true;
  },

  mobile(value) {
    if (!value) return "请输入手机号";
    if (!/^1[3-9]\d{9}$/.test(value)) return "请输入正确的手机号";
    return true;
  },
  code(value) {
    if (!value) return "请输入正确的验证码";
    return true;
  },
  isAgree(value) {
    if (!value) return "请勾选用户协议";
    return true;
  },
};
