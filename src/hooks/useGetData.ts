import { useEffect, useState } from "react";
import SocketManager from "../services/socket-manager";

export interface IWebSocketMessage {
	s: string; // Symbol
	P: string; // Price change percent
	c: string; // Last Price
}

const useGetData = () => {
	const [message, setMessage] = useState<IWebSocketMessage[] | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	const handleMessage = (msg: IWebSocketMessage[]) => {
		setMessage(msg);
	};

	const socketManager = new SocketManager("wss://fstream.binance.com/ws");

	useEffect(() => {
		socketManager.connect();
		setIsConnected(true);

		const subscribeMessage = {
			method: "SUBSCRIBE",
			params: ["!ticker@arr"],
			id: 1,
		};

		socketManager.sendMessage(subscribeMessage);

		socketManager.addMessageHandler((msg) => {
			if (Array.isArray(msg)) {
				handleMessage(msg);
			}
		});

		return () => {
			socketManager.disconnect();
		};
	}, []);

	return { isConnected, message };
};

export default useGetData;
