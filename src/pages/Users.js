import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Popconfirm, Row, Col, Modal, Form, Input, Select, Space, Table
} from 'antd';
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
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
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

  const [search, setSearch] = useState({
    searchText: '',
    searchedColumn: '',
  });
  const searchInput = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getListUsers());
    dispatch(getRoles());
  }, [dispatch]);

  useEffect(() => {
    if (activeUser) {
      form.setFieldsValue({
        name: activeUser.name,
        email: activeUser.email,
        phone: activeUser.phone,
        rol: activeUser.rol,
      });
    } else {
      form.setFieldsValue(initFormValues);
    }

    return () => {
      form.resetFields();
    };
  }, [activeUser, form]);

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

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput.current = node;
          }}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Buscar
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Borrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: text =>
      search.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[search.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearch({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };
  
  const handleReset = clearFilters => {
    clearFilters();
    setSearch({ searchText: '' });
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      showOnResponse: true,
      showOnDesktop: true,
      ...getColumnSearchProps('email')
    },
    {
      title: 'Rol',
      dataIndex: 'rol',
      key: 'rol',
      responsive: ["md"],
      ...getColumnSearchProps('rol')
    },
    {
      title: 'Acciones',
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
          form={form}
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
      <Table dataSource={users} columns={columns} rowKey="uid" />
    </>
  );
};
