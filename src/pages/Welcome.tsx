import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Card, Icon, Typography } from 'antd';
import React from 'react';

export default (): React.ReactNode => (
  <PageHeaderWrapper title="首页" content="欢迎使用后台管理系统">
    <Card>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        <Icon type="smile" theme="twoTone" /> Admin Web{' '}
        <Icon type="heart" theme="twoTone" twoToneColor="#eb2f96" /> You
      </Typography.Title>
    </Card>
    <p style={{ textAlign: 'center', marginTop: 24 }}>
      <a href="https://github.com/rebue" target="_blank" rel="noopener noreferrer">
        rebue微服务架构
      </a>
      后台管理系统
    </p>
  </PageHeaderWrapper>
);
