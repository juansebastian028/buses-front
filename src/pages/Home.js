import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from 'antd';
import { getListBuses } from "../actions/busRoutes";
import { CardBusRoute } from "../components/CardBusRoute";

const { Search } = Input;
export const Home = () => {
  const dispatch = useDispatch();
  const [busRoutesFormat, setBusRoutesFormat] = useState([]);
  const { busRoutes } = useSelector((state) => state.busRoute);

  useEffect(() => {
    dispatch(getListBuses());
  }, [dispatch]);

  useEffect(() => {
    if (busRoutes.length) {
      const busRoutesFormatted = busRoutes.map((busRoute) => {
        return {
          uid: busRoute?.uid,
          title: `Ruta # ${busRoute?.number}`,
          description: `${busRoute?.journeys?.outward[0]} - ${busRoute?.journeys?.return[0]}`,
        };
      });
      setBusRoutesFormat(busRoutesFormatted);
    }
  }, [busRoutes]);

  const onSearch = value => console.log(value);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <Search
        placeholder="Buscar Ruta"
        allowClear
        enterButton="Buscar"
        size="middle"
        onSearch={onSearch}
      />
      {busRoutesFormat.map((busRoute, i) => (
        <CardBusRoute busRoute={busRoute} key={i} />
      ))}
    </div>
  );
};
