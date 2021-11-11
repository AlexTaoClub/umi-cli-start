import { Effect } from 'dva';
import { Reducer, AnyAction } from 'redux';

export interface ModelDvaState {
  [key: string]: any;
}

export interface ModelDva {
  namespace: string;
  state: ModelDvaState;
  effects: {
    [key: string]: Effect;
  };
  reducers: {
    // [key: string]: Reducer<ModelDvaState>;
    [key: string]: Reducer;
  };
  subscriptions?: object;
}
