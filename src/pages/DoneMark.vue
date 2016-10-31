<template>
  <div class="modal light" @click.self="dismiss">
    <div class="mark">
      <p>{{agenda.title}}</p>
      <input type="text" id="log" placeholder="记录一下。。。">
      <hr>
      <div id="amount" v-show="agenda.targetId">
        <input type="number" placeholder="新增打卡数" min="1" step="1">
        <span>番茄</span>
      </div>
      <hr v-show="agenda.targetId">
      <button @click="doit"><span>完成</span></button>
    </div>
  </div>
</template>

<style>
.mark {
  background:#404040;
  top: 0;
  width: 100%;
  height:270px;
  position: absolute;

  & p {
      font-size:18px;
      color:#808080;
      margin-top: 20px;
      margin-left: 34px;
    }
  & input {
      font-size:14px;
      color: white;
      margin-left: 34px;
      background: transparent;
      border: none;
    }
  & #log {
      margin-top: 20px;
      width: 232px;
    }
  & hr {
      margin: 10px 20px;
    }
  & #amount {
    margin-top: 20px;
    margin-right: 24px;
    & span {
      float: right;
      color: #808080;
      font-size:12px;
    }
  }
  & button {
    margin: 0 24px;
    position: inherit;
    bottom: 24px;
    background:#4cd964;
    & span:after {
      content: '!!';
    }
    &:hover span:after {
      right: 10px;
    }
  }
}
</style>

<script type="text/babel">
  export default {
    name: 'done-mark',
    props: {
      dismiss: Function,
      agenda: {}
    },
    methods: {
      doit() {
        this.agenda.status = '1';
        this.dismiss();
      }
    }
  }
</script>
