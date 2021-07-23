import React from 'react';
import asyncComponent from '@/@crema/utility/asyncComponent';
import AppPage from '@/@crema/hoc/AppPage';

const Entidades = asyncComponent(() => import(`../../modules/entidades`));
export default AppPage(() => <Entidades />);
