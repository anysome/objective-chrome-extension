<template>
  <div class="modal light" @click.self="dismiss">
    <div id="settings">
      <div class="row">
        <a href="#" @click="logout">登出</a>
      </div>
      <hr>
      <div class="row">

      </div>
      <hr>
      <div class="row">

      </div>
      <hr>
      <div class="row">

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
    height: 59px;
    display: flex;
    flex-direction: row;
    align-items: center;

    & a {
      font-size: 18px;
      color:#fdc02f;
      display: inline-block;
      text-align: center;
      width: 100%;
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
