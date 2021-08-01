import React from 'react';
import asyncComponent from '@/@crema/utility/asyncComponent';
import AppPage from '@/@crema/hoc/AppPage';

const AuditoriaForm = asyncComponent(
  () => import(`../../../modules/auditorias/AuditoriaForm`),
);
export default AppPage(() => <AuditoriaForm />);
