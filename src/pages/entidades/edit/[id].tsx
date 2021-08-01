import React from 'react';
import asyncComponent from '@/@crema/utility/asyncComponent';
import AppPage from '@/@crema/hoc/AppPage';

const EntidadForm = asyncComponent(
  () => import(`../../../modules/entidades/EntidadForm`),
);
export default AppPage(() => <EntidadForm />);
