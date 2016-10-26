<template>
  <main>
    <input type="text" class="title" placeholder="添加待办，回车保存">
    <hr>
    <section id="list">
      <div class="empty" v-if="!todos.length">
        <p>未登录帐号<br>可能导致数据丢失无法找回</p>
      </div>
      <div class="todo" v-for="todo in todos">
        <a href="#"><img :src="toIcon(todo.priority, todo.status)"></a>
        <p>{{todo.title}}</p>
        <span v-html="mark(todo)"></span>
      </div>
    </section>
    <section id="footer">
      <a href="#" class="left"><img :src="bottom.icons.left"></a>
      <a href="#" class="right"><img :src="bottom.icons.right"></a>
    </section>
  </main>
</template>

<script type="text/babel">
  export default {
    name: 'todo-list',

    data() {
      return {
        bottom: {
          icons: {
            left: require('../assets/images/login.png'),
            right: require('../assets/images/reload.png')
          }
        },
        todos: [
          {title: '大家风范空附近', priority: 3, status: '0'},
          {title: '大家风范空附近', priority: 2, status: '0'},
          {title: '大家风范空附近', priority: 1, status: '0'},
          {title: '大家风范空附近', priority: 0, status: '0'},
          {title: '大家风范空附近', priority: 3, status: '1'}
        ]
      }
    },

    methods: {
      toIcon(priority, status) {
        if (status === '1') {
          return require('../assets/images/checkbox_done.png')
        } else {
          switch (priority) {
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

      mark(todo) {
        return '昨天';
      }
    }
  }
</script>
