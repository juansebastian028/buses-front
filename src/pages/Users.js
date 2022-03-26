import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Popconfirm, Row, Col, Modal, Form, Input,
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

const initFormValues = {
  name: '',
  email: '',
  phone: '',
};

export const Users = () => {
  const dispatch = useDispatch();
  const { users, activeUser, isLoading } = useSelector((state) => state.user);
  const { isModalOpen } = useSelector((state) => state.ui);

  const [userForm] = Form.useForm();

  useEffect(() => {
    dispatch(getListUsers());
  }, [dispatch]);

  useEffect(() => {
    if (activeUser) {
      userForm.setFieldsValue({
        name: activeUser.name,
        email: activeUser.email,
        phone: activeUser.phone,
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
      dispatch(userUpdated({ id: activeUser.id, ...user }));
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
      title: 'Name',
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
      title: 'Actions',
      dataIndex: 'id',
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
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
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
          <Button onClick={onAddUser} type="primary" style={{ margin: 10 }}>
            Add
          </Button>
        </Col>
      </Row>
      <Modal
        title={activeUser ? 'Edit User' : 'Add User'}
        visible={isModalOpen}
        onCancel={handleCancelModal}
        okButtonProps={{ style: { display: 'none' } }}
        getContainer={false}
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
                message: 'Name is required',
              },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Email is required',
              },
              {
                type: 'email',
                message: 'Invalid email',
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Phone is required',
              },
            ]}
          >
            <Input placeholder="Enter your phone" />
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
