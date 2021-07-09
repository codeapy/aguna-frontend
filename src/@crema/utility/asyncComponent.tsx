import dynamic from 'next/dynamic';
import React from 'react';
import { Loader } from '../index';

export default function asyncComponent(importComponent: any) {
  return dynamic(importComponent, {
    // eslint-disable-next-line react/display-name
    loading: () => <Loader />,
  });
}
