import { useEffect, useState } from "react";

export interface IWebSocketMessage {
	s: string; // Symbol
	P: string; // Price change percent
	c: string; // Last Price
}

const useGetData = () => {
	const [message, setMessage] = useState<IWebSocketMessage[] | null>(null);
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		const ws = new WebSocket("wss://fstream.binance.com/ws");

		ws.onopen = () => {
			console.log("Connected to Binance WebSocket");
			setIsConnected(true);

			const subscribeMessage = JSON.stringify({
				method: "SUBSCRIBE",
				params: ["!ticker@arr"],
				id: 1,
			});
			ws.send(subscribeMessage);
		};

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data) as IWebSocketMessage[];
			setMessage(data);
		};

		ws.onclose = () => {
			console.log("Disconnected from Binance WebSocket");
			setIsConnected(false);
		};

		ws.onerror = (error) => {
			console.error("WebSocket Error:", error);
		};

		return () => {
			ws.close();
		};
	}, []);

	return { isConnected, message };
};

export default useGetData;
