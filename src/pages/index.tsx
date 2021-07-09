import React from 'react';
import AppPage from '../@crema/hoc/AppPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const Page2 = asyncComponent(() => import(`../modules/sample/Pages/PageTwo`));
export default AppPage(() => <Page2 />);
