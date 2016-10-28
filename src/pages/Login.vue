<template>
  <div class="modal dark">
    <input id="account" type="email" class="input" placeholder="邮箱帐号">
    <input id="pwd" type="password" class="input" placeholder="登录密码">
    <button @click="login"><span>登录 / 注册 </span></button>
    <section id="footer">
      <a href="#" class="left" @click="backward"><img :src="bottom.icons.left"></a>
    </section>
  </div>
</template>

<script type="text/babel">
  export default {
    name: 'login',

    props: {
      backward: Function
    },

    data() {
      return {
        bottom: {
          icons: {
            left: require('../assets/images/logout.png')
          }
        }
      }
    },
    methods: {
      login() {
        console.log('to login')
      }
    }
  }
</script>
