import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input, List } from "antd";
import { getListBuses } from "../actions/busRoutes";
import { CardBusRoute } from "../components/CardBusRoute";

const { Search } = Input;
export const Home = () => {
  const dispatch = useDispatch();
  const { currentUser, isLogged } = useSelector((state) => state.auth);
  const [busRoutesFormat, setBusRoutesFormat] = useState([]);
  const { busRoutes } = useSelector((state) => state.busRoute);

  useEffect(() => {
    dispatch(getListBuses());
  }, [dispatch]);

  useEffect(() => {
    if (busRoutes.length && !currentUser?.favouritesBusRoutes?.length) {
      const busRoutesFormatted = formatBusRoutes(busRoutes);
      setBusRoutesFormat(busRoutesFormatted);
    }

    if (
      isLogged &&
      busRoutes.length &&
      currentUser?.favouritesBusRoutes?.length
    ) {
      const busRoutesIds = currentUser.favouritesBusRoutes.map(
        (busRoute) => busRoute._id
      );
      const busRoutesFormatted = busRoutes.map((busRoute) => {
        if (busRoutesIds.includes(busRoute.uid)) {
          return {
            uid: busRoute?.uid,
            title: `Ruta # ${busRoute?.number}`,
            description: `${busRoute?.journeys?.outward[0]} - ${busRoute?.journeys?.return[0]}`,
            isAddedToFavourites: true,
          };
        } else {
          return {
            uid: busRoute?.uid,
            title: `Ruta # ${busRoute?.number}`,
            description: `${busRoute?.journeys?.outward[0]} - ${busRoute?.journeys?.return[0]}`,
            isAddedToFavourites: false,
          };
        }
      });
      setBusRoutesFormat(busRoutesFormatted);
    }
  }, [busRoutes, currentUser.favouritesBusRoutes, isLogged]);

  const formatBusRoutes = (busRoutes) => {
    const busRoutesFormatted = busRoutes.map((busRoute) => {
      return {
        uid: busRoute?.uid,
        title: `Ruta # ${busRoute?.number}`,
        description: `${busRoute?.journeys?.outward[0]} - ${busRoute?.journeys?.return[0]}`,
        isAddedToFavourites: false,
      };
    });
    return busRoutesFormatted;
  };

  const onSearch = (value) => {
    const busRoutesSearch = busRoutes.filter(
      (busRoute) =>
        busRoute.number.includes(value) ||
        busRoute.journeys.outward
          .map((journey) => journey.toLowerCase())
          .includes(value.toLowerCase()) ||
        busRoute.journeys.return
          .map((journey) => journey.toLowerCase())
          .includes(value.toLowerCase())
    );
    const busRoutesFormatted = formatBusRoutes(busRoutesSearch);
    setBusRoutesFormat(busRoutesFormatted);
  };

  return (
    <>
      <Search
        placeholder="Buscar Ruta"
        allowClear
        enterButton="Buscar"
        size="middle"
        onSearch={onSearch}
        style={{ marginBottom: "1rem" }}
      />
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ["10", "50", "100", "1000"],
          position: "bottom",
        }}
        dataSource={busRoutesFormat}
        renderItem={(busRoute) => (
          <List.Item>
            <CardBusRoute busRoute={busRoute} />
          </List.Item>
        )}
      ></List>
    </>
  );
};
