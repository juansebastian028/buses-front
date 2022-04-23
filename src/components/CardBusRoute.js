import React, { useState } from 'react';
import { Card, Avatar } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBusRouteToFavourites, removeBusRouteFromFavourites } from '../actions/user';
const { Meta } = Card;

export const CardBusRoute = ({ busRoute }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const [isAddedToFavourites, setIsAddedToFavourites] = useState(false);

  const addToFavourites = () => {
    setIsAddedToFavourites(true);
    dispatch( addBusRouteToFavourites(currentUser.uid, busRoute.uid) );
  };

  const removeFromFavourites = () => {
    setIsAddedToFavourites(false);
  };

  return (
    <Card size="small" 
      extra={!isAddedToFavourites ? <StarOutlined onClick={addToFavourites} /> : <StarFilled onClick={removeFromFavourites} />} style={{ width: 300 }}>
      <Link to={`/bus-route/${busRoute.uid}`}>
        <Meta
          avatar={
            <Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Bus-logo.svg/768px-Bus-logo.svg.png" />
          }
          title={busRoute.title}
          description={busRoute.description}
        />
      </Link>
    </Card>
  );
};
