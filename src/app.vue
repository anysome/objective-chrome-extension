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

    data() {
      return {
        signed: false
      }
    },

    components: {
      TodoList
    },

    async created() {
      this.signed = await this.$airloy.auth.setup();
      console.log(`signed ? ${this.signed}`);
    }
  };
</script>
