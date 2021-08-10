import { useField } from 'formik';
import React from 'react';
import { Autocomplete as MuAutocomplete } from '@material-ui/lab';

const Autocomplete = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : ``;
  return (
    <MuAutocomplete
      {...field}
      {...props}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

export default Autocomplete;
