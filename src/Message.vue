<template>
  <div :class="messageClassNames">
    <text :class="bodyClassNames">{{nameWithSuffix}}{{body}}</text>
  </div>
</template>

<script>
export default {
  props: ['body', 'name', 'mine'],
  computed: {
    messageClassNames() {
      let classBase = 'message';
      if (this.mine) {
        classBase += '-mine';
      }
      return [classBase];
    },
    bodyClassNames() {
      let classBase = 'body';
      if (this.mine) {
        classBase += '-mine';
      }
      return [classBase];
    },
    nameWithSuffix() {
      if (this.mine) {
        return '';
      } else {
        return `${this.name}: `;
      }
    }
  }
}
</script>

<style scoped>
.message, .message-mine {
  padding: 16px;
  flex-direction: row;
  background-color: #fff;
}

.message {
  justify-content: flex-start;
}

.message-mine {
  justify-content: flex-end;
}

.body, .body-mine {
  padding: 20px;
  border-radius: 12px;
  color: #333;
  border-width: 2px;
  border-style: solid;
  border-color: #ddd;
}

.body-mine {
  background-color: #dfd;
}
</style>