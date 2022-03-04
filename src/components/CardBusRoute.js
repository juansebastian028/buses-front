import React, { useState } from 'react';
import { Card, Avatar } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export const CardBusRoute = ({ busRoute }) => {
  const [isAddedToFavourites, setIsAddedToFavourites] = useState(false);
  return (
    <Card size="small" 
      extra={!isAddedToFavourites ? <StarOutlined onClick={() => setIsAddedToFavourites(true)} /> : <StarFilled onClick={() => setIsAddedToFavourites(false)} />} style={{ width: 300 }}>
      <Link to={`/bus-route/${busRoute._id}`}>
        <Meta
          avatar={
            <Avatar src="https://cdn-icons-png.flaticon.com/512/64/64283.png" />
          }
          title={busRoute.title}
          description={busRoute.description}
        />
      </Link>
    </Card>
  );
};
