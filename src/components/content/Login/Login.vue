<template>
  <div class="Login">
    <div class="login-title">{{$config.commonConfig.systemName}}（ 临时样式页面，直接登录。）</div>
    <div class="loginBox">
      <div class="loginBox-title">用户登录</div>
      <div class="loginBox-li">
        <div class="loginBox-li-title">用户名</div>
        <form class="form">
          <input placeholder="请输入用户名" v-model="uName" type="text">
        </form>
      </div>
      <div class="loginBox-li">
        <div class="loginBox-li-title">密码</div>
        <form class="form">
          <input placeholder="请输入密码" name="password" autocomplete v-model="pwd" type="password">
        </form>
      </div>
      <div class="loginBox-btn" @click="goLogin">登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      uName: '',
      pwd: ''
    }
  },
  created () {
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {

    },
    goLogin () {
      this.$bus.$emit('loginSucceeded')
    }
  },
  beforeDestroy () {

  }
}
</script>

<style lang="scss" scoped>
.Login {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #0b3657;
  .login-title {
    position: absolute;
    top: 15%;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 50px;
    color: #f2f2f2;
  }
  .loginBox {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 450px;
    background-color: #145180;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba($color: #333, $alpha: 0.4);
    overflow: hidden;
    .loginBox-title {
      margin: 40px 0;
      color: #f2f2f2;
      font-size: 32px;
      text-align: center;
    }
    .loginBox-li {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      width: 80%;
      margin-left: 50%;
      transform: translateX(-50%);
      height: 50px;
      color: #f2f2f2;
      font-size: 18px;
      &:last-child {
        margin-bottom: 0;
      }
      .loginBox-li-title {
        width: 15%;
      }
      .form {
        width: 85%;
        height: 100%;
        input {
          padding: 0 10px;
          width: 100%;
          height: 100%;
          background-color: #f2f2f2;
          border-radius: 6px;
          font-size: 18px;
          overflow: hidden;
        }
      }
    }
    .loginBox-btn {
      margin-top: 80px;
      margin-left: 50%;
      transform: translateX(-50%);
      width: 420px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 18px;
      color: #f2f2f2;
      border-radius: 20px;
      background-color: #288ad4;
      cursor: pointer;
    }
  }
}
</style>