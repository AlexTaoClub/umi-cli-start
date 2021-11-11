import React, { useEffect } from 'react';
import { required } from '@/utils/Form';
import { history } from 'umi';
import { connect } from 'dva';
import { ModelDvaState } from '@/models/ModelDvaType';
import { Form, Input, Button, Checkbox } from 'antd';

import './index.less';

const Login = (props: any) => {
  const onFinish = (values: any) => {
    const { dispatch } = props;
    dispatch({
      type: 'common/fetchUser',
      payload: {
        ...values,
      },
    });
  };

  return (
    <div className="login flex-center-center">
      <div className="login-content">
        <h3>
          <span>欢迎使用</span>
        </h3>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item name="userAccount" rules={required('请输入帐号！')}>
            <Input placeholder="帐号" />
          </Form.Item>

          <Form.Item name="passWord" rules={required('请输入密码！')}>
            <Input.Password placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const getModelStore = (modelState: ModelDvaState) => {
  const { common } = modelState;
  return {
    user: common.user,
  };
};
export default connect(getModelStore, null, null, { forwardRef: true })(Login);
