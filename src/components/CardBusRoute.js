import React from "react";
import { Card, Avatar } from "antd";

const { Meta } = Card;

const data = [
	{
		title: "Ruta # 12",
		description: "Pinares - Bombay",
	},
	{
		title: "Ruta # 12",
		description: "Pinares - Bombay",
	},
	{
		title: "Ruta # 12",
		description: "Pinares - Bombay",
	},
	{
		title: "Ruta # 12",
		description: "Pinares - Bombay",
	},
	{
		title: "Ruta # 12",
		description: "Pinares - Bombay",
	},
	{
		title: "Ruta # 12",
		description: "Pinares - Bombay",
	},
	{
		title: "Ruta # 12",
		description: "Pinares - Bombay",
	},
	{
		title: "Ruta # 12",
		description: "Pinares - Bombay",
	},
	{
		title: "Ruta # 12",
		description: "Pinares - Bombay",
	},
	{
		title: "Ruta # 12",
		description: "Pinares - Bombay",
	},
];

export const CardBusRoute = () => {
	return (
		<>
			{data.map((route) => (
				<Card style={{ width: 300 }}>
					<Meta
						avatar={
							<Avatar src="https://cdn-icons-png.flaticon.com/512/64/64283.png" />
						}
						title={route.title}
						description={route.description}
					/>
				</Card>
			))}
		</>
	);
};
