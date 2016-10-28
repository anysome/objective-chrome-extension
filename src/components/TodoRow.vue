<template>
  <div class="todo">
    <a href="#" @click="toDoit"><img :src="generateIcon()"></a>
    <p @click="openEdit" :class="agenda.status === '1' ? 'done' : '' ">{{agenda.title}}</p>
    <span class="detail" v-html="remark()"></span>
    <done-mark :dismiss="dismiss" v-show="page == 1" :agenda="agenda"></done-mark>
  </div>
</template>

<script type="text/babel">
  import DoneMark from '../pages/DoneMark.vue';

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
      DoneMark
    },
    methods: {
      toDoit() {
        this.agenda.status === '0' && (this.page = 1);
      },
      openEdit() {
        this.page = 2;
        console.log('to edit');
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
      remark() {
        if (this.agenda.status === '1') {
          return '';
        }
        // TODO if it's today
        if (this.agenda.reminder) {
          return `<img src="${require('../assets/images/bell.png')}">`;
        }
        return '昨天';
      }
    }
  }
</script>
