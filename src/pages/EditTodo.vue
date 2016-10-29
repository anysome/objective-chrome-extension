<template>
  <div class="modal dark">
    <div class="mark" style="height: 485px;">
      <input type="text" id="title" :placeholder="agenda.title" v-model.trim="title">
      <hr>
      <textarea rows="5" type="text" id="detail" :placeholder="agenda.detail||'备注信息...'" v-model="detail"></textarea>
      <section class="footer">
        <a href="#" @click="toCancel" class="cancle">{{deleting ? '取消' : '返回'}}</a>
        <a href="#" @click="toDelete" class="del">{{deleting ? '确认删除' : '删除'}}</a>
        <a href="#" @click="save" class="save" v-show="!deleting">保存</a>
      </section>
    </div>
  </div>
</template>

<style>
  #title {
    font-size: 18px;
    margin-top: 16px;
    width: 232px;
    padding: 6px 0;
  }
  #detail {
    width: 232px;
    background: transparent;
    font-size:14px;
    color: white;
    margin-left: 34px;
    border: none;
  }
  .footer {
    position: fixed;
    top: 445px;
    width: 300px;
    display: flex;

    & a {
      color: white;
      display:block;
      text-align: center;
      line-height: 40px;
      vertical-align: middle;
    }

    & .cancle {
      flex: 1;
      background: #ceced2;
    }
    & .del {
      flex: 1;
      background: #fdc02f;
    }
    & .save {
      flex: 2;
      background: #4cd964;
    }
  }
</style>

<script type="text/babel">
  export default {
    name: 'edit-todo',
    props: {
      dismiss: Function,
      agenda: {}
    },
    data() {
      return {
        title: '',
        detail: '',
        deleting: false
      }
    },
    mounted() {
      this.title = this.agenda.title;
      this.detail = this.agenda.detail;
    },
    methods: {
      toCancel() {
        this.deleting ? this.deleting = false : this.dismiss();
      },
      toDelete() {
        this.deleting ? this.doDelete() : this.deleting = true;
      },
      doDelete() {
        console.log('remote delete');
      },
      save() {
        this.dismiss();
      }
    }
  }
</script>
