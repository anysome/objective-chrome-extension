<template>
  <div class="modal light" @click.self="dismiss">
    <div class="mark">
      <p>{{agenda.title}}</p>
      <input type="text" id="log" placeholder="记录一下。。。" v-model="remark">
      <hr>
      <div id="amount" v-show="agenda.targetId">
        <input type="number" placeholder="新增打卡数" min="1" step="1" v-model="amount">
        <span>{{agenda.unit|unitName}}</span>
      </div>
      <hr v-show="agenda.targetId">
      <button @click="doit"><span>完成</span></button>
    </div>
    <span class="tip" v-show="error">{{error}}</span>
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
  import api from '../api.json';
  import {getUnitName, translate} from '../libs/util';

  export default {
    name: 'done-mark',
    props: {
      dismiss: Function,
      agenda: {}
    },
    data() {
      return {
        remark: '',
        amount: 1,
        error: ''
      }
    },
    filters: {
      unitName(unit) {
        if (typeof unit === 'undefined') {
          return '';
        } else {
          return getUnitName(unit);
        }
      }
    },
    methods: {
      async doit() {
        if (this.$airloy.auth.logined()) {
          let result = await this.$airloy.net.httpPost(api.agenda.finish, {
            id: this.agenda.id,
            amount: this.amount,
            remark: this.remark
          });
          if (result.success) {
            this.agenda.status = '1';
            this.agenda.doneTime = new Date();
            this.$airloy.event.emit('todolist:changed');
            this.dismiss();
          } else {
            this.error = translate(result.message);
          }
        } else {
          this.agenda.status = '1';
          this.dismiss();
        }
      }
    }
  }
</script>
