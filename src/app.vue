<template>
  <todo-list v-if="signed"></todo-list>
  <login v-else></login>
</template>

<style>
  @import "assets/style.css";
</style>

<script type="text/babel">
  import TodoList from './pages/TodoList.vue';
  import Login from './pages/Login.vue';

  export default {
    name: 'app',

    data() {
      return {
        signed: false
      }
    },

    components: {
      TodoList,
      Login
    },

    async created() {
      this.signed = await this.$airloy.auth.setup();
      console.log(`signed ? ${this.signed}`);
    }
  };
</script>
