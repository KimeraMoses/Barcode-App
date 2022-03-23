import { lazy } from 'react';

export const dashboardPages = [
  {
    path: 'onsite-users',
    Component: lazy(() => import('./OnSiteUsers/OnSiteUsers.page'))
  },
  { path: 'all-users', Component: lazy(() => import('./AllUsers/AllUsers.page')) },
  {
    path: 'check-in',
    Component: lazy(() => import('./CheckInOut/CheckInOut.page'))
  },
  {
    path: 'barcodes',
    Component: lazy(() => import('./Barcodes/Barcodes.page'))
  }
];

const pages = [{ path: '/', Component: lazy(() => import('./Login/Login.page')) }];

export default pages;
