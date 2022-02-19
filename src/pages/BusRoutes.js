import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Popconfirm, Row, Col, Modal, Form, Input,
} from 'antd';
import  Table  from 'ant-responsive-table';
import {
  clearActiveBusRoute,
  getListBuses,
  setActiveBusRoute,
  busRouteAdded,
  busRouteDeleted,
  busRouteUpdated,
} from '../actions/busRoutes';
import { Spinner } from '../components/Spinner';
import { uiOpenModal, uiCloseModal } from '../actions/ui';

const initFormValues = {
  busRouteNumber: null,
};

export const BusRoutes = () => {
  const dispatch = useDispatch();
  const { busRoutes, activeBusRoute, isLoading } = useSelector((state) => state.busRoute);
  const { isModalOpen } = useSelector((state) => state.ui);

  const [busRoutesForm] = Form.useForm();

  useEffect(() => {
    dispatch(getListBuses());
  }, [dispatch]);

  useEffect(() => {
    if (activeBusRoute) {
      busRoutesForm.setFieldsValue({
        busRouteNumber: activeBusRoute.busRouteNumber,
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
      dispatch(busRouteUpdated({ id: activeBusRoute.id, ...busRoute }));
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

  const columns = [
    {
      title: '# Ruta',
      dataIndex: 'busRouteNumber',
      key: 'busRouteNumber',
      showOnResponse: true,
      showOnDesktop: true
    },
    {
      title: 'Salida',
      dataIndex: 'busDeparture',
      key: 'busDeparture',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Llegada',
      dataIndex: 'busArrival',
      key: 'busArrival',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Actions',
      dataIndex: 'id',
      key: 'id',
      showOnResponse: true,
      showOnDesktop: true,
      render: (id, busRoute) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              onEditBusRoute(busRoute);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this bus route?"
            onConfirm={() => handleDelete(id)}
            okText="Si"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
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
            Add
          </Button>
        </Col>
      </Row>
      <Modal
        title={activeBusRoute ? 'Edit Bus Route' : 'Add Bus Route'}
        visible={isModalOpen}
        onCancel={handleCancelModal}
        okButtonProps={{ style: { display: 'none' } }}
        getContainer={false}
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
            name="busRoteNumber"
            rules={[
              {
                required: true,
                message: '# Ruta es obligatorio',
              },
            ]}
          >
            <Input placeholder="Ingrese el número de la ruta" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 12,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Send
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
          pagination: true
        }}
        mobileBreakPoint={768} rowKey="id" />
    </>
  );
};
