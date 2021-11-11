import { getAdminToken } from '@/services/api';
import { TokenKey, setCookie } from '@/utils/Cookies';
import md5 from 'js-md5';
import { history } from 'umi';
import { message } from 'antd';

import { AnyAction } from 'redux';
import { ModelDvaState, ModelDva } from './ModelDvaType';

export interface User {
  name: string;
  [key: string]: any;
}

export interface CommonModelState extends ModelDvaState {
  user?: User;
}

const CommonModel: ModelDva = {
  namespace: 'common',
  state: <CommonModelState>{
    user: {} as User,
  },
  effects: {
    *fetchUser({ payload }, { call, put }) {
      message.success('登陆成功！');
      setCookie(TokenKey, 'data');
      history.replace('/welcome');
      return;
      const { userAccount, passWord } = payload;
      const response: User = yield call(getAdminToken, {
        userAccount,
        passWord: md5(passWord),
      });
      const { success, message: msg, data } = response;
      if (success) {
        message.success('登陆成功！');
        setCookie(TokenKey, data);
        history.replace('/welcome');
        yield put({
          type: 'changeUser',
          payload: {
            name: 'Admin',
          },
        });
      } else {
        message.error(msg);
      }
    },
    *handleChangeUser({ payload, callback }, { call, put }) {
      yield put({
        type: 'changeUser',
        payload: { ...payload.data },
      });
      if (callback) {
        callback('handle change success');
      }
    },
  },
  reducers: {
    changeUser(state: CommonModelState, action: AnyAction) {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    },
  },
};
export default CommonModel;
