<template>
  <main class="main">
    <section id="header">
      <input type="text" class="title" placeholder="添加待办，回车保存" @keyup.enter="addTodo" v-model.trim="title">
      <hr>
    </section>
    <section id="list" v-scroll-bottom="todos">
      <div class="empty" v-if="!todos.length">
        <p>使用APP管理更多事项</p>
      </div>
      <todo-row v-for="todo in todos" :agenda="todo"></todo-row>
    </section>
    <section id="footer">
      <a href="#" class="left" @click="toPage"><img :src="bottom.icons.left"></a>
      <a href="#" class="right"><img :src="bottom.icons.right"></a>
    </section>
    <login v-if="!this.signed" v-show="page === 1" :dismiss="dismiss"></login>
    <settings v-if="this.signed" v-show="page === 2" :dismiss="dismiss"></settings>
  </main>
</template>

<style>
  .main {
    padding: 0 14px;
  }
  #header { /* Chrome/Opera/Safari */
    & ::-webkit-input-placeholder {
       color: #efeff4;
     }

    & .title {
        font-size:18px;
        color: var(--color-important);
        border: none;
        width: 232px;
        margin-top: 8px;
        padding: 14px 20px;
      }
  }
  #list {
    margin-top: 17px;
    height: 365px;
    overflow-y: auto;
  }
  #footer {
    position: fixed;
    top: 445px;
    left: 14px;
    width: 272px;

  & .left {
      padding: 10px 0;
      float: left;
    }
  & .right {
      padding: 10px 0;
      position:absolute;
      right: 0;
    }
  }
</style>

<script type="text/babel">
  import Vue from 'vue';
  import TodoRow from '../components/TodoRow.vue';
  import Login from './Login.vue';
  import Settings from './Settings.vue';
  import {timeout} from '../libs/util';

  export default {
    name: 'todo-list',
    components: {
      TodoRow,
      Login,
      Settings
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
        title: '',
        todos: []
      }
    },
    directives: {
      'scroll-bottom'() {
        Vue.nextTick(() => {
          let el = arguments[0]
          el.scrollTop = el.scrollHeight - el.clientHeight
        })
      }
    },
    methods: {
      addTodo() {
        this.todos.push({
          title: this.title,
          priority: 0,
          status: '0',
          today: new Date().getTime()
        });
        this.todos.sort(function(a, b) {
          if (a.today > b.today) {
            return 1;
          } else if (a.today < b.today) {
            return -1;
          } else {
            return b.priority - a.priority;
          }
        });
        this.title = '';
      },
      toPage() {
        this.page = this.signed ? 2 : 1;
      },
      dismiss() {
        this.page = 0;
      }
    },
    async created() {
      console.log('created');
      this.signed = await this.$airloy.auth.setup();
      if (this.signed) {
        this.bottom.icons.left = require('../assets/images/settings.png')
      } else {
        await timeout(1000);
        this.todos.push({title: '注册帐号', priority: 3, status: '0', today: new Date('2016-10-20')});
        await timeout(1000);
        this.todos.push({title: '登录行事易APP', priority: 2, status: '0', today: new Date().getTime() - 86400000 * 2, targetId: 2});
        await timeout(1000);
        this.todos.push({title: '使用APP管理添加目标', priority: 1, status: '0', today: new Date().getTime() - 86400000});
        await timeout(1000);
        this.todos.push({title: '安排目标某天的待办事项', priority: 0, status: '0', today: new Date().getTime() - 3600000});
        await timeout(1000);
        this.todos.push({title: '同步到chrome插件', priority: 1, status: '0', today: new Date().getTime(), reminder: new Date().getTime()});
        await timeout(1000);
        this.todos.push({title: '方便在电脑上查看待办', priority: 0, status: '0', today: new Date().getTime() + 86400000});
        await timeout(1000);
        this.todos.push({title: '完成待办', priority: 0, status: '0', today: new Date().getTime() + 86400000 * 2});
        await timeout(1000);
        this.todos.push({title: '同步回APP', priority: 3, status: '0', today: new Date().getTime() + 86400000 * 10});
      }
    }
  }
</script>
