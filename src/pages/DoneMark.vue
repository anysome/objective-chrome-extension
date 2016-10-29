<template>
  <div class="modal light" @click.self="dismiss">
    <div class="mark">
      <p>{{agenda.title}}</p>
      <input type="text" id="log" placeholder="记录一下。。。">
      <hr>
      <div id="amount" v-show="agenda.targetId">
        <input type="number" placeholder="新增打卡数">
        <span>番茄</span>
      </div>
      <hr v-show="agenda.targetId">
      <button @click="doit"><span>完成</span></button>
    </div>
  </div>
</template>

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
