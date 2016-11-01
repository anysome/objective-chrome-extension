<template>
  <div class="modal light" @click.self="dismiss">
    <div id="settings">
      <div class="row">
        <a class="action" href="#" @click="logout">登出</a>
      </div>
      <hr>
      <div class="row" style="cursor: pointer;" @click="openTab">
        <p>打开网站</p>
        <img :src="require('../assets/images/chevron.png')">
      </div>
      <hr>
      <div class="row">
        <p>显示已完成</p>
        <a href="#" @click="toggleShowDone">
          <img :src="checkIcon()">
        </a>
      </div>
      <hr>
      <div class="row">
        <p>自动更新</p>
        <div>
          <a href="#" @click="reduceInterval"><img :src="require('../assets/images/skip_backward.png')"></a>
          <span>{{interval}} 分钟</span>
          <a href="#" @click="addInterval"><img :src="require('../assets/images/skip_forward.png')"></a>
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

<script type="text/ecmascript-6">
  import {sendBackground, openWeb} from '../libs/util';

  export default {
    name: 'settings',
    props: {
      dismiss: Function
    },
    data() {
      return {
        showDone: true,
        interval: 15
      }
    },
    methods: {
      logout() {
        this.$airloy.auth.logout();
        this.dismiss(2);
      },
      openTab() {
        openWeb('https://exease.com');
      },
      toggleShowDone() {
        if (this.showDone) {
          this.$airloy.store.setItem('hide_done', '1');
          this.showDone = false;
        } else {
          this.$airloy.store.setItem('hide_done', '0');
          this.showDone = true;
        }
      },
      checkIcon() {
        if (this.showDone) {
          return require('../assets/images/checked.png');
        } else {
          return require('../assets/images/checkbox_none.png');
        }
      },
      setInterval(val) {
        this.interval = val;
        this.$airloy.store.setItem('refresh_interval', val);
      },
      reduceInterval() {
        let modified = true;
        switch (this.interval) {
          case 15:
            modified = false;
            break;
          case 30:
            this.setInterval(15);
            break;
          case 45:
            this.setInterval(30);
            break;
          case 60:
            this.setInterval(45);
            break;
          case 90:
            this.setInterval(60);
            break;
          case 120:
            this.setInterval(90);
            break;
        }
        modified && sendBackground('updateInterval');
      },
      addInterval() {
        let modified = true;
        switch (this.interval) {
          case 120:
            modified = false;
            break;
          case 90:
            this.setInterval(120);
            break;
          case 60:
            this.setInterval(90);
            break;
          case 45:
            this.setInterval(60);
            break;
          case 30:
            this.setInterval(45);
            break;
          case 15:
            this.setInterval(30);
            break;
        }
        modified && sendBackground('updateInterval');
      }
    },
    async created() {
      let interval = await this.$airloy.store.getItem('refresh_interval');
      interval && (this.interval = parseInt(interval, 0));
      let hideDone = await this.$airloy.store.getItem('hide_done');
      this.showDone = !hideDone;
    }
  }
</script>
