import React from 'react';
import AppPage from '../@crema/hoc/AppPage';
import asyncComponent from '../@crema/utility/asyncComponent';

const Entidades = asyncComponent(() => import(`../modules/entidades`));
export default AppPage(() => <Entidades />);
