import EventEmitter from 'events';

const wsURL = `ws://${WEBSOCKET_HOST}:8181`;

class ChatController extends EventEmitter {
  constructor({ socket } = {}) {
    super();
    this.name = null;
    this.socket = socket;
    this.openSocket();
  }

  signIn(name) {
    this.name = name;
  }

  get signedIn() {
    return this.name !== null;
  }

  signOut() {
    this.name = null;
  }

  send(message) {
    const data = JSON.stringify({
      name: this.name,
      message,
    });
    console.log(data);
    this.socket.send(data);
  }

  receiveString(str) {
    this.emit('received', str);
  }

  receive(data) {
    if (data) {
      console.log(data);
      this.emit('received', JSON.parse(data));
    }
  }

  openSocket() {
    this.socket.WebSocket(wsURL, 'echo-protocol');
    this.socket.onmessage = ({ data }) => this.receive(data);
    this.socket.onopen = (options) => console.log('opened connection');
    this.socket.onerror = ({ data }) => console.error(data);
  }

  closeSocket() {
    this.socket.close();
  }
}

export default ChatController;
