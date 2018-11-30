import React from 'react';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    livingSurface: Yup.number().required('Living Surface is required.'),
    landSurface: Yup.number().required('Land Surface is required.'),
    numberOfRooms: Yup.number().required('Number Of Rooms is required!'),
    numberOfParkings: Yup.number().required('Number Of Parkings is required!'),
  }),

  mapPropsToValues: ({ property }) => ({
    ...property,
  }),
  handleSubmit: (payload, { props, setSubmitting, resetForm }) => {
    setSubmitting(false);
    props.handleSubmit(payload);
    resetForm();
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
            id="livingSurface"
            label="Living Surface"
            className={''}
            css={{ width: '100%' }}
            variant="filled"
            error={touched.livingSurface && errors.livingSurface && true}
            helperText={touched.livingSurface&&errors.livingSurface}
            value={values.livingSurface || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete={'off'}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="landSurface"
            label="Land Surface"
            className={''}
            css={{ width: '100%' }}
            variant="filled"
            error={touched.landSurface && errors.landSurface && true}
            helperText={touched.landSurface&&errors.landSurface}
            value={values.landSurface || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete={'off'}
          />
        </Grid>
        <Grid item xs={12} sm={6} />
        <Grid item xs={12} sm={3}>
          <TextField
            id="numberOfRooms"
            label="Number Of Rooms"
            className={''}
            css={{ width: '100%' }}
            variant="filled"
            error={touched.numberOfRooms && errors.numberOfRooms && true}
            helperText={touched.numberOfRooms&&errors.numberOfRooms}
            value={values.numberOfRooms || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete={'off'}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            id="numberOfParkings"
            label="Number Of Parkings"
            className={''}
            css={{ width: '100%' }}
            variant="filled"
            error={touched.numberOfParkings && errors.numberOfParkings && true}
            helperText={touched.numberOfParkings&&errors.numberOfParkings}
            value={values.numberOfParkings || ''}
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
