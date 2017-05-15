<template>
  <transition name="slide-fade">
    <div class="todo">
      <a href="#" @click="toDoit"><img :src="generateIcon()"></a>
      <p @click="openEdit" :class="titleClass()">{{agenda.title}}</p>
      <span class="detail" v-html="remark()"></span>
      <done-mark :dismiss="dismiss" v-if="!agenda.deleted && agenda.status === '0'" v-show="page === 1" :agenda="agenda"></done-mark>
      <edit-todo :dismiss="dismiss" v-if="!agenda.deleted && agenda.status === '0'" v-show="page === 2" :agenda="agenda"></edit-todo>
    </div>
  </transition>
</template>

<style>
  @import "../assets/var.css";
  .todo {
    width: 100%;
    /*height: 41px;*/
    display: flex;
    align-items: center;

    & a {
      width: 24px;
      height: 100%;
      display: flex;
      align-items: center;
    }
    & p {
      flex: 1;
      font-size:18px;
      color: var(--color-important);
    }
    & .remove {
      text-decoration: line-through;
      color: #ceced2;
    }
    & .done {
      color:#efeff4;
    }
    & .detail {
      font-size:12px;
      color:#ceced2;
      text-align:right;
    }
  }
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-enter {
    padding-left: 150px;
    opacity: 0;
  }
</style>

<script type="text/babel">
  import DoneMark from '../pages/DoneMark.vue';
  import EditTodo from '../pages/EditTodo.vue';

  export default {
    name: 'todo-row',
    props: {
      agenda: {}
    },
    data() {
      return {
        page: 0 // 0 none, 1 doit, 2 edit
      };
    },
    components: {
      DoneMark,
      EditTodo
    },
    methods: {
      toDoit() {
        this.page = 1;
      },
      openEdit() {
        this.page = 2;
      },
      dismiss() {
        this.page = 0;
      },
      generateIcon() {
        if (this.agenda.status === '1') {
          return require('../assets/images/checkbox_done.png')
        } else {
          switch (this.agenda.priority) {
            case 0:
              return require('../assets/images/checkbox_none.png');
            case 1:
              return require('../assets/images/checkbox_normal.png');
            case 2:
              return require('../assets/images/checkbox_middle.png');
            default:
              return require('../assets/images/checkbox_important.png');
          }
        }
      },
      titleClass() {
        if (this.agenda.deleted) {
          return 'remove';
        }
        if (this.agenda.status === '1') {
          return 'done';
        } else {
          return '';
        }
      },
      remark() {
        if (this.agenda.status === '1') {
          return '';
        }
        let diff = new Date().getTime() - this.agenda.today;
        if (diff < -86400000 * 2) {
          let d = new Date(this.agenda.today);
          return (1 + d.getMonth()) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
        } else if (diff < -86400000) {
          return '后天';
        } else if (diff < 0) {
          return '明天';
        } else if (diff < 86400000) {
          if (this.agenda.reminder) {
            return `<img src="${require('../assets/images/bell.png')}">`;
          } else {
            return '';
          }
        } else if (diff < 86400000 * 2) {
          return '昨天';
        } else if (diff < 86400000 * 3) {
          return '前天';
        } else {
          let d = new Date(this.agenda.today);
          return (1 + d.getMonth()) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
        }
      }
    }
  }
</script>
