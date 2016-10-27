<template>
  <div class="modal">
    <input id="account" type="email" class="input" placeholder="邮箱帐号">
    <input id="pwd" type="password" class="input" placeholder="登录密码">
    <a href="#" class="button">登录 / 注册</a>
    <section id="footer">
      <a href="#" class="left"><img :src="bottom.icons.left"></a>
    </section>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'login',

    data() {
      return {
        bottom: {
          icons: {
            left: require('../assets/images/logout.png')
          }
        }
      }
    }
  }
</script>
