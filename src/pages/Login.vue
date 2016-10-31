<template>
  <div class="modal dark">
    <input id="account" type="email" class="input" placeholder="邮箱帐号" v-model.trim="account">
    <input id="pwd" type="password" class="input" placeholder="登录密码" v-model="password">
    <button @click="login"><span>登录 / 注册 </span></button>
    <span class="tip" v-show="error">{{error}}</span>
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
  import {translate} from '../libs/util';

  export default {
    name: 'login',

    props: {
      dismiss: Function
    },

    data() {
      return {
        account: '',
        password: '',
        error: '',
        bottom: {
          icons: {
            left: require('../assets/images/logout.png')
          }
        }
      }
    },
    methods: {
      async login() {
        if (this.account.length < 5) {
          this.error = '帐号至少5位';
          return;
        }
        if (this.password.length < 6) {
          this.error = '密码至少6位';
          return;
        }
        let user = this.$airloy.auth.formUser(this.account, this.password);
        let result = await this.$airloy.net.httpPost(api.public.sign, user);
        if (result.success) {
          this.$airloy.auth.saveUser(result.info);
          this.dismiss();
        } else {
          this.error = translate(result.message);
        }
      }
    }
  }
</script>
