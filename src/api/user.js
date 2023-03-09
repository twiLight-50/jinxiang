import request from "@/utils/request";

/**
 * 账号密码登录
 * @param {String} account - 账号
 * @param {String} password - 密码
 * 
 */
export const userAccountLogin=({account,password})=>{
    return request('/login','post',{account,password})
}
/**
 *获取手机验证码
 * @param {string} mobile 
 * @returns promise
 */
export const userMobileCode=(mobile)=>{
    return request('/login/code','get',{mobile})
}

/**
 * 手机号登录
 * @param {string} mobile -手机号 
 * @param {string} code -验证码 
 * @returns promise
 */
export const userMobileLogin=({mobile,code})=>{
    return request('/login/code','post',{mobile,code})
}
/**
 * 三方登录
 * @param{string} unionld - 唯一标识
 * 
 */

export const userQQLogin=(unionld,source=1)=>{
    return request('/login/social','post' ,{unionld,source})
}


/**
 * qq绑定
 * @param {String } mobile - 手机号
 * @returns  promise
 */
 export const userQQBind=(mobile=>{
    return request('/login/social/code','get',{mobile})
 })

/**
 * 
 * 
 */

export const userQQBindLogin=(({unionId,mobile,code})=>{
return request('/login/social/bind','post',{unionId,mobile,code})
})

/**
 * 校验用户名唯一性
 * @param {String} account - 账号
 * promise
 */
export const userAccountCheck=(account)=>{
    return request('/register/check','get',{account})
}

/**
 * 注册获取验证码
 * @param{String} mobile -手机号
 * promise
 */
 export const userQQPatchCode=(mobile)=>{
    return request('/register/code','get',{mobile})
}
/**
 * QQ登录-账号绑定
 * @param {String} account - 账号
 * @param{String} mobile -手机号
 * @param{string} unionld - 唯一标识
 * @param{string} code - 验证码
 */

 export const userQQPatchLogin=(({unionId,mobile,code,account,password})=>{
    return request(`/login/social/${unionId}/complement`,'post',{unionId,mobile,code,account,password})
    })
    