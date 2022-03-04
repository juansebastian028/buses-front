import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 52 }} spin />;

export const Spinner = () => (
  <Spin indicator={antIcon}>
    <div style={{ minHeight: '100vh', minWidth: 'calc(100vw-200px)' }} />
  </Spin>
);
