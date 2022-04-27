import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { List, Input } from "antd";
import { CardBusRoute } from "../components/CardBusRoute";
import { NoBusRoutes } from "./NoBusRoutes";

const { Search } = Input;
export const MyFavoriteRoutes = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const [busRoutesFormat, setBusRoutesFormat] = useState([]);

  useEffect(() => {
    if (currentUser.favouritesBusRoutes.length) {
      const busRoutesFormatted = formatBusRoutes(currentUser.favouritesBusRoutes);
      setBusRoutesFormat(busRoutesFormatted);
    } else {
      setBusRoutesFormat(currentUser.favouritesBusRoutes);
    }
  }, [currentUser.favouritesBusRoutes]);

  if (!currentUser?.favouritesBusRoutes?.length) {
    return <NoBusRoutes />;
  }

  const formatBusRoutes = (busRoutes) => {
    const busRoutesFormatted = busRoutes.map((busRoute) => {
      return {
        uid: busRoute?._id,
        title: `Ruta # ${busRoute?.number}`,
        description: `${busRoute?.journeys?.outward[0]} - ${busRoute?.journeys?.return[0]}`,
        isAddedToFavourites: true,
      };
    });
    return busRoutesFormatted;
  };

  const onSearch = (value) => {
    const busRoutesSearch = currentUser.favouritesBusRoutes.filter(busRoute => busRoute.number.includes(value) || busRoute.journeys.outward.includes(value) || busRoute.journeys.return.includes(value));
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
