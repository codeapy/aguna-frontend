import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { Form, Formik, useField } from 'formik';
import * as yup from 'yup';
import { useIntl } from 'react-intl';
import Box from '@material-ui/core/Box';
import { CremaTheme } from '@/types/AppContextPropsType';
import { router } from 'next/client';
import { ApolloError } from '@apollo/client';
import { useUpsertEntidadMutation } from '@/hooks/entidades';
import AppAnimate from '../../@crema/core/AppAnimate';
import IntlMessages from '../../@crema/utility/IntlMessages';

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
const MyTextField = (props: any) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : ``;
  return (
    <TextField
      {...props}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const EntidadForm = () => {
  const classes = useStyles();
  const { messages } = useIntl();

  const [mutate] = useUpsertEntidadMutation();

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
            validateOnChange
            initialValues={{
              nombre: ``,
            }}
            validationSchema={validationSchema}
            onSubmit={(data, { setSubmitting, setErrors }) => {
              mutate({ variables: data })
                .then(() => {
                  router.push(`/entidades`);
                })
                .catch((err: ApolloError) => {
                  setErrors({ nombre: err.message });
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form className={classes.form} noValidate autoComplete="off">
                <Box>
                  <MyTextField
                    label={<IntlMessages id="common.name" />}
                    name="nombre"
                    variant="outlined"
                    className={classes.textField}
                  />
                </Box>

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

export default EntidadForm;
