import React from 'react';
import asyncComponent from '@/@crema/utility/asyncComponent';
import AppPage from '@/@crema/hoc/AppPage';

const Auditorias = asyncComponent(() => import(`../../modules/auditorias`));
export default AppPage(() => <Auditorias />);
