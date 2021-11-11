import { useState, useEffect } from 'react';
import { connect } from 'dva';
import { ModelDvaState } from '@/models/ModelDvaType';

import { history, Link } from 'umi';
import { TokenKey, getCookie, removeCookie } from '@/utils/Cookies';

import ProLayout, { PageContainer } from '@ant-design/pro-layout';
import proSettings from '../../config/proSettings';
import { layoutsRoutes } from '../../config/routes';
import IconMap from './IconMap';
import logo from '../assets/login1.png';

import './index.less';

const defaultLocation = '/';
const ProLayoutFrame = (props: any) => {
  const { dispatch, user } = props;
  const [pathname, setPathname] = useState(defaultLocation);

  useEffect(() => {
    const token = getCookie(TokenKey);
    if (token) {
      dispatch({
        type: 'common/handleChangeUser',
        payload: {
          data: {
            name: 'Admin',
          },
        },
      });
    } else {
      history.replace('/login');
    }
    setDefaultData();
  }, []);

  // 默认数据
  const setDefaultData = () => {
    setTimeout(() => {
      const location = window.location;
      const locationPathname = location.pathname || defaultLocation;
      setPathname(locationPathname);
    }, 10);
  };
  // menu - item
  const menuItemRender = (item: any, dom: any) => {
    const { icon, path } = item;
    let iconNode = item.icon ? IconMap[icon] : '';
    return (
      <Link to={item.path} onClick={() => setPathname(path)}>
        {iconNode}
        {item.name}
      </Link>
    );
  };

  // menu - sub - item
  const subMenuItemRender = (item: any, dom: any) => {
    let iconNode = item.icon ? IconMap[item.icon] : '';
    return (
      <div>
        {iconNode}
        {item.name}
      </div>
    );
  };

  // getItemRender
  const getItemRender = (route: any) => {
    return (
      <Link
        to={route.path}
        onClick={() => {
          setDefaultData();
        }}
      >
        {route.breadcrumbName}
      </Link>
    );
  };

  // proLayoutProps
  const proLayoutProps = {
    route: {
      path: '/',
      routes: layoutsRoutes,
    },
    location: {
      pathname: pathname,
    },
    settings: { ...proSettings },
  };
  return (
    <ProLayout
      logo={logo}
      title="umi-cli"
      headerContentRender={(props) => ''}
      rightContentRender={() => <div>{user.name}</div>}
      footerRender={false}
      onMenuHeaderClick={() => history.push('/welcome')}
      menuItemRender={(item, dom) => menuItemRender(item, dom)}
      subMenuItemRender={(item, dom) => subMenuItemRender(item, dom)}
      breadcrumbRender={(routers = []) => [...routers]}
      itemRender={(route: any, params, routes, paths) => getItemRender(route)}
      {...proLayoutProps}
    >
      <PageContainer>{props.children}</PageContainer>
    </ProLayout>
  );
};
const getModelStore = (modelState: ModelDvaState) => {
  const { common } = modelState;
  return {
    user: common.user,
  };
};
export default connect(getModelStore, null, null, { forwardRef: true })(
  ProLayoutFrame,
);
