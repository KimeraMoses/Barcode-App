import { lazy } from 'react';

export const dashboardPages = [
  {
    path: 'onsite-users',
    Component: lazy(() => import('./OnSiteUsers/OnSiteUsers.page'))
  },
  { path: 'all-users', Component: lazy(() => import('./AllUsers/AllUsers.page')) }
];

const pages = [{ path: '/', Component: lazy(() => import('./Login/Login.page')) }];

export default pages;
