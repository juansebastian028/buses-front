import React, { useEffect } from "react";
import { Row, Col, Divider, List } from "antd";
import { useParams } from "react-router-dom";
import { Comments } from "../components/Comments";
import { Map } from "../components/Map";
import { useDispatch, useSelector } from "react-redux";
import { getBusRouteById } from "../actions/busRoutes";

export const BusRoute = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useSelector((state) => state.BusRoute);
  const { currentBusRoute } = useSelector((state) => state.busRoute);

  useEffect(() => {
    dispatch(getBusRouteById(id));
  }, [dispatch, id]);

  return (
    <>
      <Row gutter={[24, 16]}>
        <Col xs={24} xl={18}>
          <Map />
        </Col>
        <Col xs={24} xl={6}>
          <Divider orientation="left">Ida</Divider>
          <List
            size="small"
            bordered
            dataSource={currentBusRoute?.journeys?.outward}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Divider orientation="left">Vuelta</Divider>
          <List
            size="small"
            bordered
            dataSource={currentBusRoute?.journeys?.return}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Col>
      </Row>
      <Comments />
    </>
  );
};
