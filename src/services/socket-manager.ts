class SocketManager {
	private url: string;
	private socket: WebSocket | null = null;
	private messageHandlers: ((message: any) => void)[] = [];
	private reconnectInterval: number;
	private shouldReconnect: boolean = true;
	private pendingMessages: any[] = [];

	constructor(url: string, reconnectInterval = 5000) {
		this.url = url;
		this.reconnectInterval = reconnectInterval;
	}

	connect() {
		if (this.socket) {
			this.socket.close();
		}

		this.socket = new WebSocket(this.url);

		this.socket.onopen = () => {
			console.log("WebSocket connected");
			this.pendingMessages.forEach((message) => this.sendMessage(message));
			this.pendingMessages = [];
		};

		this.socket.onmessage = (event) => {
			const message = JSON.parse(event.data);
			this.messageHandlers.forEach((handler) => handler(message));
		};

		this.socket.onclose = () => {
			console.log("WebSocket disconnected");
			if (this.shouldReconnect) {
				setTimeout(() => this.connect(), this.reconnectInterval);
			}
		};

		this.socket.onerror = (error) => {
			console.error("WebSocket error", error);
		};
	}

	disconnect() {
		this.shouldReconnect = false;
		if (this.socket) {
			this.socket.close();
		}
	}

	sendMessage(message: any) {
		if (this.socket && this.socket.readyState === WebSocket.OPEN) {
			this.socket.send(JSON.stringify(message));
		} else {
			this.pendingMessages.push(message);
		}
	}

	addMessageHandler(handler: (message: any) => void) {
		this.messageHandlers.push(handler);
	}

	removeMessageHandler(handler: (message: any) => void) {
		this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
	}
}

export default SocketManager;
