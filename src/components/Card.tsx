import { IWebSocketMessage } from "../hooks/useGetData";
import {
	CardSubTitle,
	CardSubValue,
	CardTitle,
	CardValue,
	CardSubChild,
	CardWrapper,
} from "../styles/styled";

interface ICardProps {
	info: IWebSocketMessage;
}

export default function Card({ info }: Readonly<ICardProps>) {
	return (
		<CardWrapper>
			<CardSubChild>
				<CardTitle>{info.s}</CardTitle>
				<CardSubTitle>Perpetual</CardSubTitle>
			</CardSubChild>
			<CardSubChild>
				<CardValue>{info.c}</CardValue>
				<CardSubValue value={parseFloat(info.P)}>{info.P}%</CardSubValue>
			</CardSubChild>
		</CardWrapper>
	);
}
