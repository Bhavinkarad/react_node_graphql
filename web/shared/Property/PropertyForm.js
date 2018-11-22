import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    living_surface: Yup.number().required('Living Surface is required.'),
    land_surface: Yup.number().required('Land Surface is required.'),
    number_of_rooms: Yup.number().required('Number Of Rooms is required!'),
    number_of_parkings: Yup.number().required(
      'Number Of Parkings is required!'
    ),
  }),

  mapPropsToValues: ({ property }) => ({
    ...property,
  }),
  handleSubmit: (payload, { setSubmitting }) => {
    setSubmitting(false);
  },
  displayName: 'PropertyForm',
});
const PropertyForm = props => {
  const {
    values,
    touched,
    errors,
    // dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    // handleReset,
    isSubmitting,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={3}>
          <TextField
            id="living_surface"
            label="Living Surface"
            className={''}
            css={{ width: '100%' }}
            variant="filled"
            error={touched.living_surface && errors.living_surface}
            value={values.living_surface}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete={'off'}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="land_surface"
            label="Land Surface"
            className={''}
            css={{ width: '100%' }}
            variant="filled"
            error={touched.land_surface && errors.land_surface}
            value={values.land_surface}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete={'off'}
          />
        </Grid>
        <Grid item xs={12} sm={6} />
        <Grid item xs={12} sm={3}>
          <TextField
            id="number_of_rooms"
            label="Number Of Rooms"
            className={''}
            css={{ width: '100%' }}
            variant="filled"
            error={touched.number_of_rooms && errors.number_of_rooms}
            value={values.number_of_rooms}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete={'off'}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="number_of_parkings"
            label="Number Of Parkings"
            className={''}
            css={{ width: '100%' }}
            variant="filled"
            error={touched.number_of_parkings && errors.number_of_parkings}
            value={values.number_of_parkings}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete={'off'}
          />
        </Grid>
        <Grid item xs={12} sm={6} />
        <Grid item xs={12} sm={10} />
        <Grid item xs={12} sm={2}>
          <Button
            color="primary"
            variant="contained"
            css={{ marginTop: 80, width: '100%' }}
            disabled={isSubmitting}
            type="submit"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

const MyEnhancedForm = formikEnhancer(PropertyForm);

export default MyEnhancedForm;
