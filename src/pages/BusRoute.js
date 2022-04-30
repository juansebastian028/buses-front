import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Comments } from "../components/Comments";
import { Map } from "../components/Map";
import {
  getListBuses,
} from "../actions/busRoutes";

export const BusRoute = () => {
  return (
    <>
      <Map />
      <Comments />
    </>
  );
};
