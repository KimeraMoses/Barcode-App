import { lazy } from 'react';

const pages = [
  { path: '/', Component: lazy(() => import('./OnSiteUsers/OnSiteUsers.page')) },
  { path: '/all-users', Component: lazy(() => import('./AllUsers/AllUsers.page')) }
];

export default pages;
