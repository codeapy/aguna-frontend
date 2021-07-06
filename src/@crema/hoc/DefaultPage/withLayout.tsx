import React from 'react';
import AuthLayout from './AuthLayout';

// eslint-disable-next-line react/display-name
const withLayout = (ComposedComponent: any) => (props: any) =>
  (
    <AuthLayout>
      <ComposedComponent {...props} />
    </AuthLayout>
  );
export default withLayout;
