import { useField } from 'formik';
import MuTextField from '@material-ui/core/TextField';
import React from 'react';

const TextField = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : ``;
  return (
    <MuTextField
      {...field}
      {...props}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default TextField;
