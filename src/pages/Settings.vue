<template>
  <div class="modal light" @click.self="dismiss">
    <div id="settings">
      <div class="row">
        <a class="action" href="#" @click="logout">登出</a>
      </div>
      <hr>
      <div class="row">
        <p>打开网站</p>
        <img :src="require('../assets/images/chevron.png')">
      </div>
      <hr>
      <div class="row">
        <p>显示已完成</p>
        <a href="#">
          <img :src="require('../assets/images/checked.png')">
        </a>
      </div>
      <hr>
      <div class="row">
        <p>自动更新</p>
        <div>
          <a href="#"><img :src="require('../assets/images/skip_backward.png')"></a>
          <span>15 分钟</span>
          <a href="#"><img :src="require('../assets/images/skip_forward.png')"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  #settings {
    background: #404040;
    bottom: 0;
    width: 100%;
    height: 240px;
    position: absolute;

    & hr {
      background: #efeff4;
    }
  }
  .row {
    height: 39px;
    display: flex;
    padding: 10px 24px;
    flex-direction: row;
    align-items: center;

    & .action {
      font-size: 18px;
      color:#fdc02f;
      display: inline-block;
      text-align: center;
      width: 100%;
    }
    & p {
      color: #ceced2;
      font-size: 14px;
      flex: 1;
    }
    & span {
      color: white;
      padding: 0 5px;
      font-size: 14px;
    }
  }
</style>

<script type="text/babel">
  export default {
    name: 'settings',
    props: {
      dismiss: Function
    },
    methods: {
      logout() {
        this.$airloy.auth.logout();
        this.dismiss(2);
      }
    }
  }
</script>
