import React, { useEffect, useState } from "react";
import { Row, Col, Divider, List, Tabs } from "antd";
import { useParams } from "react-router-dom";
import { Comments } from "../components/Comments";
import { Map } from "../components/Map";
import { useDispatch, useSelector } from "react-redux";
import { getBusRouteById } from "../actions/busRoutes";

const { TabPane } = Tabs;
export const BusRoute = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [coords, setCoords] = useState({
    outward: [],
    return: [],
  })
  useSelector((state) => state.BusRoute);
  const { currentBusRoute } = useSelector((state) => state.busRoute);

  useEffect(() => {
    dispatch(getBusRouteById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if ( currentBusRoute && currentBusRoute.coords.outward && currentBusRoute.coords.return) {
      setCoords({
        outward: currentBusRoute.coords.outward,
        return: currentBusRoute.coords.return,
      })
    }
  }, [currentBusRoute]);

  return (
    <>
      <Row gutter={[24, 16]}>
        <Col xs={24} xl={18}>
          <Tabs defaultActiveKey="1" type="card">
            <TabPane tab="Ida" key="1">
              <Map coords={coords.outward} />
            </TabPane>
            <TabPane tab="Vuelta" key="2">
              <Map coords={coords.return} />
            </TabPane>
          </Tabs>
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
