import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { CircularProgress, makeStyles } from '@material-ui/core';
import { Form, Formik, useField } from 'formik';
import * as yup from 'yup';
import { useIntl } from 'react-intl';
import Box from '@material-ui/core/Box';
import { CremaTheme } from '@/types/AppContextPropsType';
import { ApolloError } from '@apollo/client';
import { useRouter } from 'next/router';
import { useAuditoria, useUpsertAuditoriaMutation } from '@/hooks/auditorias';
import TextField from '@/modules/form/TextField';
import Autocomplete from '@/modules/form/Autocomplete';
import { useEntidades } from '@/hooks/entidades';
import { Entidad } from '@/types/models/auditorias/App';
import MuTextField from '@material-ui/core/TextField';
import IntlMessages from '../../@crema/utility/IntlMessages';
import AppAnimate from '../../@crema/core/AppAnimate';

const useStyles = makeStyles((theme: CremaTheme) => ({
  logo: {
    height: 24,
  },
  textField: {
    width: `100%`,
  },
  card: {
    width: `80%`,
    textAlign: `center`,
    padding: 24,
    overflow: `hidden`,
    boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`,
    [theme.breakpoints.up(`lg`)]: {
      padding: 32,
    },
    [theme.breakpoints.up(`xl`)]: {
      padding: `48px 64px`,
    },
  },
  form: {
    display: `flex`,
    flexDirection: `column`,
    gap: 32,
    textAlign: `left`,
    marginBottom: 12,
    [theme.breakpoints.up(`xl`)]: {
      marginBottom: 32,
    },
  },
  button: {
    width: `200px`,
    height: 44,
    marginTop: `24px`,
  },
  iconColor: {
    color: theme.palette.text.primary,
  },
  pointer: {
    cursor: `pointer`,
  },
}));

const EntidadAutocomplete = (props: any) => {
  const [{ value = null }, , { setValue }] = useField(props);
  const { data, loading: isLoading } = useEntidades();

  return (
    <Autocomplete
      {...props}
      value={value}
      onChange={(event: any, newValue: Entidad) => {
        setValue(newValue);
      }}
      getOptionLabel={(option: Entidad) => option.nombre}
      options={data}
      renderOption={(option: Entidad) => <div>{option.nombre}</div>}
      renderInput={(params: any) => (
        <MuTextField
          {...params}
          label="Entidad"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

const AuditoriaForm = () => {
  const classes = useStyles();
  const { messages } = useIntl();
  const router = useRouter();
  const { id } = router.query;
  const isEdit = id != null;

  const { data: auditoria } = useAuditoria({
    variables: {
      id: Number(id),
    },
    skip: !isEdit,
  });

  const [mutate] = useUpsertAuditoriaMutation({ isEdit });

  const validationSchema = yup.object({
    nombre: yup
      .string()
      .required(messages[`validation.nombreRequired`] as string),
  });

  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box
        display="flex"
        flex={1}
        flexDirection="row"
        justifyContent="center"
        alignItems="flex-start"
      >
        <Card className={classes.card}>
          <Formik
            key={auditoria?.id}
            validateOnChange
            initialValues={
              auditoria ?? {
                nombre: ``,
                entidad: {
                  id: undefined,
                },
              }
            }
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting, setErrors }) => {
              mutate({
                variables: {
                  id: id != null ? Number(id) : undefined,
                  nombre: data.nombre,
                  entidadId: data.entidad.id,
                },
              })
                .then(() => {
                  router.push(`/auditorias`);
                })
                .catch((err: ApolloError) => {
                  setErrors({ nombre: err.message });
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form className={classes.form} noValidate autoComplete="off">
                <TextField
                  label={<IntlMessages id="common.name" />}
                  name="nombre"
                  variant="outlined"
                  className={classes.textField}
                />

                <EntidadAutocomplete
                  label="Entidad"
                  name="entidad"
                  variant="outlined"
                  className={classes.textField}
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  className={classes.button}
                >
                  <IntlMessages id="common.save" />
                </Button>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
    </AppAnimate>
  );
};

export default AuditoriaForm;
