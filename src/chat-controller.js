import EventEmitter from 'events';

const wsURL = `ws://${process.env.WEBSOCKET_HOST}:8181`;

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
        this.socket.send(JSON.stringify({
            name: this.name,
            message,
        }));
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
        // this.socket.onopen = (msg) => this.receiveString(msg);
        // this.socket.onerror = (msg) => this.receiveString(msg);
    }

    closeSocket() {
        this.socket.close();
    }
}

export default ChatController;