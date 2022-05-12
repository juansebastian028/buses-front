import React from "react";
import { Typography, Space } from "antd";

const { Title, Text } = Typography;

export const AboutUs = () => {
  return (
    <>
      <Title level={2}>Acerca de Nosotros</Title>
      <Space direction="vertical">
        <Text>
          Bus Soft es un aplicativo web y móvil el cual permite que los usuarios
          sepan la ubicación exacta del medio de trasporte público conocido como
          bus, el aplicativo mostrará la ruta de cada bus al igual que sus
          trayectos de ida y trayectos de vuelta y el tiempo que tardará en
          llegar a su respectiva estación o paradero.
        </Text>
        <Text>
          Bus Soft nace de la necesidad de los ciudadanos en la ciudad de
          Pereira, ya que muchos de ellos suelen perder tiempo esperando el bus,
          causando que lleguen tarde a su destino u opten por tomar otro medio de
          transporte más costoso.
        </Text>
      </Space>
    </>
  );
};
