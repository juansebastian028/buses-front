import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Popconfirm,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Space,
  Table,
  message,
  Upload,
} from "antd";
import { SearchOutlined, UploadOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  getListPosts,
  postDeleted,
  postAdded,
  postUpdated,
  clearActivePost,
  setActivePost,
} from "../actions/posts";
import { Spinner } from "../components/Spinner";
import { uiOpenModal, uiCloseModal } from "../actions/ui";

const initFormValues = {
  title: "",
  desc: "",
  img: null,
};

export const Posts = () => {
  const dispatch = useDispatch();
  const { posts, activePost, isLoading } = useSelector((state) => state.post);
  const { isModalOpen } = useSelector((state) => state.ui);
  const { currentUser } = useSelector((state) => state.auth);
  const uploadProps = {
    name: "file",
    action: `${process.env.REACT_APP_API_URL}/uploads/`,
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} archivo subido exitosamente`);
      } else if (info.file.status === "error") {
        message.error(`El ${info.file.name} archivo falló al subirse`);
      }
    },
  };
  const [search, setSearch] = useState({
    searchText: "",
    searchedColumn: "",
  });
  const searchInput = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getListPosts());
  }, [dispatch]);
  
  useEffect(() => {
    if (activePost) {
      form.setFieldsValue({
        title: activePost.title,
        desc: activePost.desc,
        img: activePost.img,
      });
    } else {
      form.setFieldsValue(initFormValues);
    }

    return () => {
      form.resetFields();
    };
  }, [activePost, form]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleDelete = (id) => {
    dispatch(postDeleted(id));
  };

  const openModal = () => {
    dispatch(uiOpenModal());
  };

  const handleCancelModal = () => {
    dispatch(uiCloseModal());
  };

  const onFinishAddPost = (post) => {
    const newPost = {
      date: new Date().getTime(),
      user: currentUser.uid,
      ...post,
    };
    if (activePost) {
      dispatch(postUpdated({ id: activePost.uid, ...newPost }));
    } else {
      dispatch(postAdded(newPost));
    }
    handleCancelModal();
  };

  const onEditPost = (post) => {
    dispatch(setActivePost(post));
    openModal();
  };

  const onAddPost = () => {
    dispatch(clearActivePost());
    openModal();
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput.current = node;
          }}
          placeholder={`Buscar ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Borrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      search.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[search.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        <div style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
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

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearch({ searchText: "" });
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Descripción",
      dataIndex: "desc",
      key: "desc",
      ...getColumnSearchProps("desc"),
    },
    {
      title: "Publicado por",
      responsive: ["md"],
      render: (_, post) => (post.user.name),      
    },
    {
      title: "Acciones",
      render: (_, post) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              onEditPost(post);
            }}
          >
            Editar
          </Button>
          <Popconfirm
            title="Está seguro de eliminar esta publicación?"
            onConfirm={() => handleDelete(post.uid)}
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
          <Button onClick={onAddPost} type="primary" style={{ margin: 10 }}>
            Agregar
          </Button>
        </Col>
      </Row>
      <Modal
        title={activePost ? "Editar Publicación" : "Agregar Publicación"}
        visible={isModalOpen}
        onCancel={handleCancelModal}
        okButtonProps={{ style: { display: "none" } }}
        getContainer={false}
        width="600px"
      >
        <Form
          form={form}
          name="addPostForm"
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinishAddPost}
          initialValues={initFormValues}
        >
          <Form.Item
            label="Título"
            name="title"
            rules={[
              {
                required: true,
                message: "El título es obligatorio",
              },
            ]}
          >
            <Input placeholder="Ingrese el título" />
          </Form.Item>
          <Form.Item
            label="Descripción"
            name="desc"
            rules={[
              {
                required: true,
                message: "La descripción es obligatorio",
              },
            ]}
          >
            <Input.TextArea placeholder="Ingrese el descripción" />
          </Form.Item>
          <Form.Item
            name="img"
            label="Imagen"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload {...uploadProps} maxCount={1}>
              <Button icon={<UploadOutlined />}>Cargar</Button>
            </Upload>
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
      <Table dataSource={posts} columns={columns} rowKey="uid" />
    </>
  );
};
