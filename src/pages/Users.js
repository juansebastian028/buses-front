import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Popconfirm, Row, Col, Modal, Form, Input, Select
} from 'antd';
import  Table  from 'ant-responsive-table';
import {
  clearActiveUser,
  getListUsers,
  setActiveUser,
  userAdded,
  userDeleted,
  userUpdated,
} from '../actions/user';
import { Spinner } from '../components/Spinner';
import { uiOpenModal, uiCloseModal } from '../actions/ui';
import { getRoles } from '../actions/auth';

const initFormValues = {
  name: '',
  email: '',
  phone: '',
  rol: ''
};

export const Users = () => {
  const dispatch = useDispatch();
  const { users, activeUser, isLoading } = useSelector((state) => state.user);
  const { roles } = useSelector((state) => state.auth);
  const { isModalOpen } = useSelector((state) => state.ui);

  const [userForm] = Form.useForm();

  useEffect(() => {
    dispatch(getListUsers());
    dispatch(getRoles());
  }, [dispatch]);

  useEffect(() => {
    if (activeUser) {
      userForm.setFieldsValue({
        name: activeUser.name,
        email: activeUser.email,
        phone: activeUser.phone,
        rol: activeUser.rol,
      });
    } else {
      userForm.setFieldsValue(initFormValues);
    }

    return () => {
      userForm.resetFields();
    };
  }, [activeUser, userForm]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleDelete = (id) => {
    dispatch(userDeleted(id));
  };

  const openModal = () => {
    dispatch(uiOpenModal());
  };

  const handleCancelModal = () => {
    dispatch(uiCloseModal());
  };

  const onFinishAddUser = (user) => {
    if (activeUser) {
      dispatch(userUpdated({ id: activeUser.uid, ...user }));
    } else {
      dispatch(userAdded(user));
    }
    handleCancelModal();
  };

  const onEditUser = (user) => {
    dispatch(setActiveUser(user));
    openModal();
  };

  const onAddUser = () => {
    dispatch(clearActiveUser());
    openModal();
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      showOnResponse: true,
      showOnDesktop: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Acciones',
      dataIndex: 'uid',
      key: 'id',
      showOnResponse: true,
      showOnDesktop: true,
      render: (id, user) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              onEditUser(user);
            }}
          >
            Editar
          </Button>
          <Popconfirm
            title="Está seguro de eliminar este usuario?"
            onConfirm={() => handleDelete(id)}
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
          <Button onClick={onAddUser} type="primary" style={{ margin: 10 }}>
            Agregar
          </Button>
        </Col>
      </Row>
      <Modal
        title={activeUser ? 'Editar Usuario' : 'Agregar Usuario'}
        visible={isModalOpen}
        onCancel={handleCancelModal}
        okButtonProps={{ style: { display: 'none' } }}
        getContainer={false}
        width="600px"
      >
        <Form
          form={userForm}
          name="addUserForm"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinishAddUser}
          initialValues={initFormValues}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'El nombre es obligatorio',
              },
            ]}
          >
            <Input placeholder="Ingrese el nombre" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'El email es obligatorio',
              },
              {
                type: 'email',
                message: 'Email invalido',
              },
            ]}
          >
            <Input placeholder="Ingrese el email" />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: 'La contraseña es obligatoria',
              },
            ]}
          >
            <Input type="password" placeholder="Ingrese la contraseña" />
          </Form.Item>
          <Form.Item
            label="Rol"
            name="rol"
            rules={[
              {
                required: true,
                message: 'El rol es obligatorio',
              },
            ]}
          >
          <Select>
            { roles.map( (role) => <Select.Option key={role._id} value={role.rol}> {role.rol} </Select.Option> ) }
          </Select>
          </Form.Item>
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
          rowKey: "_id",
          showHeader: true,
          columns,
          dataSource: users,
          pagination: true
        }}
        mobileBreakPoint={768} rowKey="_id" />
    </>
  );
};
