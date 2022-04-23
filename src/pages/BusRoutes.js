import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Popconfirm, Row, Col, Modal, Form, Input, Tabs } from "antd";
import Table from "ant-responsive-table";
import {
  clearActiveBusRoute,
  getListBuses,
  setActiveBusRoute,
  busRouteAdded,
  busRouteDeleted,
  busRouteUpdated,
} from "../actions/busRoutes";
import { Spinner } from "../components/Spinner";
import { uiOpenModal, uiCloseModal } from "../actions/ui";
import { MapRegister } from "../components/MapRegister";
import { EditableTagGroup } from "../components/EditableTagGroup";

const initFormValues = {
  number: null,
};

export const BusRoutes = () => {
  const dispatch = useDispatch();
  const { busRoutes, activeBusRoute, isLoading } = useSelector(
    (state) => state.busRoute
  );
  const { isModalOpen } = useSelector((state) => state.ui);

  const [busRoutesForm] = Form.useForm();

  useEffect(() => {
    dispatch(getListBuses());
  }, [dispatch]);

  useEffect(() => {
    if (activeBusRoute) {
      busRoutesForm.setFieldsValue({
        number: activeBusRoute.busRouteNumber,
        journeys: {
          outward: activeBusRoute?.journeys?.outward,
          return: activeBusRoute?.journeys?.return,
        },
      });
    } else {
      busRoutesForm.setFieldsValue(initFormValues);
    }

    return () => {
      busRoutesForm.resetFields();
    };
  }, [activeBusRoute, busRoutesForm]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleDelete = (id) => {
    dispatch(busRouteDeleted(id));
  };

  const openModal = () => {
    dispatch(uiOpenModal());
  };

  const handleCancelModal = () => {
    dispatch(uiCloseModal());
  };

  const onFinishAddBusRoute = (busRoute) => {
    if (activeBusRoute) {
      console.log(busRoute);
      // dispatch(busRouteUpdated({ id: activeBusRoute.id, ...busRoute }));
    } else {
      dispatch(busRouteAdded(busRoute));
    }
    handleCancelModal();
  };

  const onEditBusRoute = (busRoute) => {
    dispatch(setActiveBusRoute(busRoute));
    openModal();
  };

  const onAddBusRoute = () => {
    dispatch(clearActiveBusRoute());
    openModal();
  };

  const handleTags = (name, tags) => {
    busRoutesForm.setFieldsValue({
      ...activeBusRoute,
      journeys: {
        [name]: tags,
      },
    });
  };

  const handleCoords = (name, coords) => {
    busRoutesForm.setFieldsValue({
      ...activeBusRoute,
      coords: {
        [name]: coords,
      },
    });
  };

  const columns = [
    {
      title: "# Ruta",
      dataIndex: "number",
      key: "number",
      showOnResponse: true,
      showOnDesktop: true,
    },
    // {
    //   title: "Salida",
    //   dataIndex: "busDeparture",
    //   key: "busDeparture",
    //   showOnResponse: true,
    //   showOnDesktop: true,
    // },
    // {
    //   title: "Llegada",
    //   dataIndex: "busArrival",
    //   key: "busArrival",
    //   showOnResponse: true,
    //   showOnDesktop: true,
    // },
    {
      title: "Actions",
      dataIndex: "id",
      key: "id",
      showOnResponse: true,
      showOnDesktop: true,
      render: (_, busRoute) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              onEditBusRoute(busRoute);
            }}
          >
            Editar
          </Button>
          <Popconfirm
            title="Are you sure to delete this bus route?"
            onConfirm={() => handleDelete(busRoute.uid)}
            okText="Si"
            cancelText="No"
          >
            <Button type="primary" danger>
              Eliminar
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Row justify="start">
        <Col span={12}>
          <Button onClick={onAddBusRoute} type="primary" style={{ margin: 10 }}>
            Agregar
          </Button>
        </Col>
      </Row>
      <Modal
        title={activeBusRoute ? "Editar Ruta" : "Agregar Ruta"}
        visible={isModalOpen}
        onCancel={handleCancelModal}
        okButtonProps={{ style: { display: "none" } }}
        getContainer={false}
        width="800px"
      >
        <Form
          form={busRoutesForm}
          name="addBusRoutesForm"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinishAddBusRoute}
          initialValues={initFormValues}
        >
          <Form.Item
            label="# Ruta"
            name="number"
            rules={[
              {
                required: true,
                message: "# Ruta es obligatorio",
              },
            ]}
          >
            <Input placeholder="Ingrese el número de la ruta" />
          </Form.Item>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="Ida" key="1">
              <Form.Item name={["journeys", "outward"]}>
                <EditableTagGroup
                  handleTags={(tags) => handleTags("outward", tags)}
                  tags={
                    activeBusRoute?.journeys?.outward
                      ? activeBusRoute.journeys.outward
                      : []
                  }
                />
              </Form.Item>
              <Form.Item name={["coords", "outward"]}>
                <MapRegister
                  handleCoords={(coords) => handleCoords("outward", coords)}
                />
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Vuelta" key="2">
              <Form.Item name={["journeys", "return"]}>
                <EditableTagGroup
                  handleTags={(tags) => handleTags("return", tags)}
                  tags={
                    activeBusRoute?.journeys?.return
                      ? activeBusRoute.journeys.return
                      : []
                  }
                />
              </Form.Item>
              <Form.Item name={["coords", "return"]}>
                <MapRegister
                  handleCoords={(coords) => handleCoords("return", coords)}
                />
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
          <Form.Item
            wrapperCol={{
              offset: 12,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        antTableProps={{
          rowKey: "id",
          showHeader: true,
          columns,
          dataSource: busRoutes,
          pagination: true,
        }}
        mobileBreakPoint={768}
        rowKey="id"
      />
    </>
  );
};
