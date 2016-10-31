<template>
  <div class="modal dark">
    <input id="account" type="email" class="input" placeholder="邮箱帐号" v-model.trim="account">
    <input id="pwd" type="password" class="input" placeholder="登录密码" v-model="password">
    <button @click="login"><span>登录 / 注册 </span></button>
    <section id="footer">
      <a href="#" class="left" @click="dismiss"><img :src="bottom.icons.left"></a>
    </section>
  </div>
</template>

<style>
  .input {
    font-size:18px;
    color: black;
    background: #EFEFF4;
    border-radius:5px;
    border: none;
    width:232px;
    height: 39px;
    padding: 0 10px;
  }
  #account {
    margin-top: 148px;
  }
  #pwd {
    margin-top: 17px;
  }
</style>

<script type="text/babel">
  import api from '../api.json';

  export default {
    name: 'login',

    props: {
      dismiss: Function
    },

    data() {
      return {
        account: '',
        password: '',
        bottom: {
          icons: {
            left: require('../assets/images/logout.png')
          }
        }
      }
    },
    methods: {
      async login() {
        // todo validate account and password
        if (this.account.length < 5) {
          this._email.focus();
          return;
        }
        if (this.password.length < 6) {
          this._password.focus();
          return;
        }
        let user = this.$airloy.auth.formUser(this.account, this.password);
        let result = await this.$airloy.net.httpPost(api.public.sign, user);
        if (result.success) {
          this.$airloy.auth.saveUser(result.info);
          this.dismiss();
        } else {
          console.log(result.message);
          // TODO tips
        }
      }
    }
  }
</script>
