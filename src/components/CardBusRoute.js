import React from 'react';
import { Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export const CardBusRoute = ({ busRoute }) => {
  return (
    <Link to={`/bus-route/${busRoute._id}`}>
      <Card style={{ width: 300 }}>
        <Meta
          avatar={
            <Avatar src="https://cdn-icons-png.flaticon.com/512/64/64283.png" />
          }
          title={busRoute.title}
          description={busRoute.description}
        />
      </Card>
    </Link>
  );
};
