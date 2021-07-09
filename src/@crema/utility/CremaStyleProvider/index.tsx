import React from 'react';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { jssPreset, StylesProvider } from '@material-ui/core/styles';
// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const CremaStyleProvider: React.FC<React.ReactNode> = ({ children }) => (
  <StylesProvider jss={jss}>{children}</StylesProvider>
);
export default CremaStyleProvider;
