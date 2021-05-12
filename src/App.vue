<template>
  <Header v-on:reload="loadData()" :acc="account"/>
  <div class="wrapper">
    <CreateTodo v-on:newTodo="addTodo($event)"/>
    <div class="loading" v-if="loading">Loading...</div>
    <div class="list" v-else>
      <Todo
        v-for="(todo, i) in TODOS"
        :key="i"
        :todo="todo"
        v-on:completed="completed($event)"
        v-on:delTodo="delTodo($event)"
        v-on:updateTodo="updateTodo($event)"
      />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import CreateTodo from './components/CreateTodo.vue'
import Todo from './components/Todo.vue'

import App from './services/app';
export default {
  name: 'App',
  components: {
    Header,
    CreateTodo,
    Todo
  },
  data() {
    return {
      APP: {},
      TODOS: [],
      loading: true,
      account: '0x0'
    }
  },
  async created() {
    this.APP = new App();
    await this.loadData();
    this.account = this.APP.account[0]
  },
  methods: {
    async loadData() {
      await this.APP.load();
      this.TODOS = await this.APP.getData();
      this.loading = false;
    },

    async completed(id) {
      await this.APP.toggleCompleted(id);
      await this.loadData();
    },

    async addTodo(text) {
      await this.APP.createTask(text);
      await this.loadData();
    },

    async delTodo(id) {
      await this.APP.deleteTask(id);
      await this.loadData();
    },

    async updateTodo(obj) {
      await this.APP.updateTask(obj.id, obj.text);
      await this.loadData();
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrapper, .list {
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
}

.loading {
  text-align: center;
  font-size: 30px;
}
</style>
