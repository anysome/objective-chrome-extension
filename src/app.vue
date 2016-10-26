<template>
  <todo-list></todo-list>
</template>

<style>
  @import "assets/style.css";
</style>

<script type="text/babel">
  import TodoList from './pages/TodoList.vue';

  export default {
    name: 'app',
    components: {
      TodoList
    }
  };
</script>
