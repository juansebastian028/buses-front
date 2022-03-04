import React from 'react'
import { CardBusRoute } from '../components/CardBusRoute';

export const MyFavoriteRoutes = () => {
  const busRoutes = [
    {
      _id: 1,
      title: 'Ruta # 12',
      description: 'Pinares - Bombay',
    },
    {
      _id: 2,
      title: 'Ruta # 12',
      description: 'Pinares - Bombay',
    },
    {
      _id: 3,
      title: 'Ruta # 12',
      description: 'Pinares - Bombay',
    }
  ];
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}
    >
      {busRoutes.map((busRoute, i) => (
        <CardBusRoute busRoute={busRoute} key={i} />
      ))}
    </div>
  );
}