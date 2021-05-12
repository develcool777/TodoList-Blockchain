<template>
  <div class="createTodo">
    <div class="container">
      <input 
        type="text" 
        class="input" 
        placeholder="What todo..." 
        v-model="field" 
        @keyup.enter="add()"
      >
    </div>
    <div class="btn" @click="add()">Add todo</div>
  </div>
</template>

<script>
export default {
  name: 'CreateTodo',
  data() {
    return {
      field: ''
    }
  },
  methods: {
    add() {
      if (this.field !== '') {
        this.$emit('newTodo', this.field);
        this.field = '';
      }

    }
  }
}
</script>

<style>
.createTodo {
  display: flex;
  align-items: center;
  margin: 20px 0 40px;
}

.container {
  flex-basis: 250px;
  height: 45px;
}

.input {
  width: 100%;
  height: 100%;
  text-indent: 20px;
  font-size: 20px;
  background: lightgray;
  border-radius: 10px 0 0 10px;
  outline: none;
  border: none;
}

.btn {
  flex: 1;
  padding: 10px 0;
  text-align: center;
  background: blue;
  color: white;
  font-size: 20px;
  cursor: pointer;
  border: 1px solid blue;
  border-radius: 0 10px 10px 0;
  transition-duration: .5s;
}

.btn:hover {
  color: blue;
  background: white;
}
</style>