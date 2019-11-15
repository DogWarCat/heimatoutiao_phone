<template>
  <div class="login_container">
    <van-nav-bar title="登录" left-arrow @click-left="$router.push('/')" />
    <van-cell-group>
      <van-field
        v-model="loginForm.mobile"
        required
        clearable
        label="手机号"
        placeholder="请输入手机号"
        :error-message="msg.mobileErrmessage"
        @blur="checkMobile"
      />
      <van-field
        v-model="loginForm.code"
        required
        center
        clearable
        label="验证码"
        placeholder="请输入验证码"
        :error-message="msg.codeErrmessage"
        @blur="checkCode"
      >
        <van-button class="p5" slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="loginButton">
      <van-button round type="info" size="large" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'login-index',
  data () {
    return {
      msg: {
        mobileErrmessage: '',
        codeErrmessage: ''
      },
      loginForm: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    checkMobile () {
      const value = this.loginForm.mobile
      if (value && !/^1[3-9]\d{9}$/.test(value)) {
        this.msg.mobileErrmessage = '手机号格式错误'
      } else if (!value) {
        this.msg.mobileErrmessage = '请填入手机号'
      } else {
        this.msg.mobileErrmessage = ''
      }
    },
    checkCode () {
      const value = this.loginForm.code
      if (value && !/^\d{6}$/.test(value)) {
        this.msg.codeErrmessage = '验证码格式错误'
      } else if (!value) {
        this.msg.codeErrmessage = '请填入验证码'
      } else {
        this.msg.codeErrmessage = ''
      }
    },
    async login () {
      this.checkMobile()
      this.checkCode()
      if (this.msg.mobileErrmessage || this.msg.codeErrmessage) {
        return false
      }
      try {
        const data = await login(this.loginForm)
        console.log(data)
        this.setUser(data)
        const { returnUrl } = this.$route.query
        // ——————————————————————————————————————
        this.$router.push(returnUrl || '/user')
      } catch (error) {
        this.$toast.fail('手机号或者验证码错误')
      }
    },
    ...mapMutations(['setUser'])
  }
}
</script>

<style lang="less" scoped>
.login_container {
  .loginButton {
    text-align: center;
    .van-button--large {
      margin-top: 8px;
      width: 96%;
      height: 38px;
      line-height: 36px;
    }
  }
}
.p5 {
  padding: 0 5px;
}
</style>
