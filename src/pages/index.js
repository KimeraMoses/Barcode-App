import { lazy } from 'react';

const pages = [{ path: '/', Component: lazy(() => import('./OnSiteUsers/OnSiteUsers.page')) }];

export default pages;
