import Card from "./Card";
import useGetData from "../hooks/useGetData";
import { Container, Heading, Message, OnLoadMessage } from "../styles/styled";

export default function WebSocketComp() {
	const { message, isConnected } = useGetData();

	return (
		<Container>
			<Heading>Binance WebSocket Connection</Heading>
			<p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
			<Message>
				{message && message.length > 0 ? (
					message?.map((msg) => <Card key={msg.s} info={msg} />)
				) : (
					<OnLoadMessage>No data received yet... </OnLoadMessage>
				)}
			</Message>
		</Container>
	);
}
