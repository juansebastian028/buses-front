import React from "react";
import { Card, Avatar } from "antd";
import { StarOutlined, StarFilled, CarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addBusRouteToFavourites,
  removeBusRouteFromFavourites,
} from "../actions/auth";
const { Meta } = Card;

export const CardBusRoute = ({ busRoute }) => {
  const dispatch = useDispatch();
  const { currentUser, isLogged } = useSelector((state) => state.auth);

  const addToFavourites = () => {
    dispatch(addBusRouteToFavourites(currentUser.uid, busRoute.uid));
  };

  const removeFromFavourites = () => {
    dispatch(removeBusRouteFromFavourites(currentUser.uid, busRoute.uid));
  };

  return (
    <Card
      size="small"
      extra={
        isLogged &&
        (!busRoute.isAddedToFavourites ? (
          <StarOutlined onClick={addToFavourites} />
        ) : (
          <StarFilled onClick={removeFromFavourites} />
        ))
      }
    >
      <Link to={`/bus-route/${busRoute.uid}`}>
        <Meta
          avatar={
            <Avatar icon={<CarOutlined />} />
          }
          title={busRoute.title}
          description={busRoute.description}
        />
      </Link>
    </Card>
  );
};
