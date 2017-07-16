<template>
  <div class="message">
    <text :class="classNames">{{name}}: {{body}}</text>
  </div>
</template>

<script>
export default {
  props: ['body', 'name', 'mine'],
  computed: {
    classNames() {
      let classBase = 'body';
      if (this.mine) {
        classBase += '-mine';
      }
      return [classBase];
    }
  }
}
</script>

<style scoped>
.message {
  padding: 16px;
  flex-direction: row;
  justify-content: flex-start;
  background-color: #fff;
}

.body {
  padding: 20px;
  border-radius: 12px;
  color: #333;
  border-width: 2px;
  border-style: solid;
  border-color: #ddd;
}

.body-mine {
  padding: 20px;
  border-radius: 12px;
  color: #333;
  border-width: 2px;
  border-style: solid;
  background-color: #dfd;
}
</style>