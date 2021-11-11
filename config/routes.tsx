import React from 'react';

export const layoutsRoutes = [
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: '欢迎',
    icon: 'smile',
    component: '@/pages/Welcome/',
  },
  {
    path: '*',
    redirect: '/welcome',
  },
];

export default [
  {
    path: '/',
    routes: [
      {
        path: '/login',
        name: '登陆',
        component: '@/pages/Login/',
      },
      {
        component: '@/layouts/index',
        routes: [...layoutsRoutes],
      },
    ],
  },
];
