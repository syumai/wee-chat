<template>
  <div class="wrapper" @click="update">
    <list class="list">
      <cell class="cell" v-for="msg in messages" :key="msg.key">
        <message :body="msg.body" :name="msg.name" :mine="userName === msg.name"/>
      </cell>
    </list>
    <div class="form-group">
      <input class="msg-input" type="text" v-model="msgText"></input>
      <text class="button" value="send" type="primary" @click="send"></text>
    </div>
  </div>
</template>

<script>
import ChatController from './chat-controller.js';
import Message from './Message.vue';

const userName = `User-${Math.floor(Math.random() * 10)}`;

const chatController = new ChatController({
  socket: weex.requireModule('webSocket')
});
chatController.signIn(userName);

let id = 0;
export default {
  data: {
    userName,
    messages: [
      {
        key: id++,
        body: 'Hello!',
        name: 'System'
      },
    ],
    msgText: ''
  },
  components: { Message },
  methods: {
    send() {
      if (this.msgText) {
        this.messages.push({
          key: id++,
          body: this.msgText,
          name: this.userName
        });
        chatController.send(this.msgText);
        this.msgText = '';
      }
    },
    receive(data) {
      if (typeof data === 'string') {
        this.messages.push({
          key: id++,
          body: data.toString(),
          name: 'System'
        });
      } else {
        const { name, message } = data;
        if (name !== chatController.name) {
          this.messages.push({
            key: id++,
            body: message,
            name
          });
        }
      }
    }
  },
  mounted() {
    chatController.on('received', (data) => {
      this.receive(data);
    });
  }
}
</script>

<style scoped>
.wrapper {
  background-color: #fff;
  align-items: stretch;
}

.title {
  padding: 16px;
  font-size: 48px;
  text-align: center;
}

.list {
  align-items: stretch;
  justify-content: flex-end;
  border: 2px #ddd solid;
}

.form-group {
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
}

.msg-input {
  flex: 1;
  padding: 16px;
  height: 72px;
  background-color: #eee;
  font-size: 32px;
  border: #000 1px solid;
  width: 600px;
}

.button {
  flex: 0;
  padding: 16px;
  height: 72px;
  font-size: 36;
  color: #333;
  text-align: center;
  padding-top: 10;
  padding-bottom: 10;
  border-width: 2;
  border-style: solid;
  border-color: #ddd;
  background-color: #ddd;
}

.button:focus {
  opacity: 0.7;
}
</style>
