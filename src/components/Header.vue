<template>
  <div class="header">
    <div class="logo" @click="reload()">Todo List</div>
    <div class="account">{{ acc }}</div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    acc: String
  },
  methods: {
    reload() {
      this.$emit('reload');
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #343a40;
}

.logo, .account {
  color: white;
  font-size: 30px;
  cursor: pointer;
}

.account {
  font-size: 20px;
  cursor: default;
}
</style>
