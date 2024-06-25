/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	background-color: #f5f5f5;
`;

export const Heading = styled.h1`
	color: #333;
	font-size: 24px;
`;

export const OnLoadMessage = styled.div`
	padding: 10px;
`;

export const Message = styled.pre`
	color: #666;
	background: #e0e0e0;
	border-radius: 4px;
	width: 100%;
	max-width: 600px;
	overflow: auto;
`;

export const CardWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	flex: 1;
	padding: 0 10px;
	align-items: start;
	background: #212630;
	&:hover {
		background: #29303d;
	}
`;

export const CardsContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
`;

export const CardTitle = styled.h2`
	font-size: 18px;
	color: #f2f2f3;
	margin: 0;
`;

export const CardSubTitle = styled.h2`
	font-size: 14px;
	color: #575f6b;
	margin: 0;
`;

interface IPercentageChangeProps {
	value: number;
}
export const CardSubValue = styled.h2<IPercentageChangeProps>`
	font-size: 14px;
	color: ${({ value }) =>
		value > 0 ? "green" : value < 0 ? "red" : "#ececee"};
	margin: 0;
	text-align: end;
`;

export const CardValue = styled.p`
	font-size: 18px;
	color: #ececee;
	margin: 0;
`;

export const CardSubChild = styled.div`
	display: flex;
	flex-direction: column;
	gap: 5px;
	padding: 10px 0;
`;
