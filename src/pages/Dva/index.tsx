import React, { useEffect } from 'react';
import { connect } from 'dva';
import { ModelDvaState } from '@/models/ModelDvaType';

const IndexDva = (props: any) => {
  const { dispatch, user } = props;
  useEffect(() => {
    // dispatch({
    //   type: 'common/fetchUser',
    //   payload: {
    //     token: 'token',
    //   },
    // });
  }, []);
  const handleChangeUser = () => {
    const data = {
      change: true,
    };
    dispatch({
      type: 'common/handleChangeUser',
      payload: {
        data,
      },
      callback: (res: any) => {
        alert(res);
      },
    });
  };
  return (
    <div>
      <h1>dva - {JSON.stringify(user)}</h1>
      <button onClick={handleChangeUser}>change user</button>
    </div>
  );
};

const getModelStore = (modelState: ModelDvaState) => {
  const { common } = modelState;
  return {
    user: common.user,
  };
};
export default connect(getModelStore, null, null, { forwardRef: true })(
  IndexDva,
);
