<template>
  <main class="main">
    <section id="header">
      <input type="text" class="title" placeholder="添加待办，回车保存" @key.entry>
      <hr>
    </section>
    <section id="list">
      <div class="empty" v-if="!todos.length">
        <p>未登录帐号<br>可能导致数据丢失无法找回</p>
      </div>
      <todo-row v-for="todo in todos" :agenda="todo"></todo-row>
    </section>
    <section id="footer">
      <a href="#" class="left" @click="toPage"><img :src="bottom.icons.left"></a>
      <a href="#" class="right"><img :src="bottom.icons.right"></a>
    </section>
    <login v-if="!this.signed" v-show="page === 1" :backward="dismiss"></login>
  </main>
</template>

<script type="text/babel">
  import TodoRow from '../components/TodoRow.vue';
  import Login from './Login.vue';

  export default {
    name: 'todo-list',
    components: {
      TodoRow,
      Login
    },
    data() {
      return {
        signed: false,
        page: 0, // 0 list, 1 login, 2 settings
        bottom: {
          icons: {
            left: require('../assets/images/login.png'),
            right: require('../assets/images/reload.png')
          }
        },
        todos: [
          {title: '大家风范空附近', priority: 3, status: '0'},
          {title: '大家风范空附近', priority: 2, status: '0', targetId: 2},
          {title: '大家风范空附近', priority: 1, status: '0'},
          {title: '大家风范空附近', priority: 0, status: '0'},
          {title: '大家风范空附近', priority: 3, status: '1'},
          {title: '大家风范空附近', priority: 1, status: '0', reminder: 1233322233},
          {title: '大家风范空附近', priority: 0, status: '0'}
        ]
      }
    },
    methods: {
      toPage() {
        this.page = this.signed ? 2 : 1;
      },
      dismiss() {
        this.page = 0;
      }
    },
    async created() {
      this.signed = await this.$airloy.auth.setup();
      if (this.signed) {
        this.bottom.icons.left = require('../assets/images/settings.png')
      }
    }
  }
</script>
