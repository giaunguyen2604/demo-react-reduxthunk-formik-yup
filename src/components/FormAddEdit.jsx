import React from 'react'
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types'
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import InputCustom from './InputCustom'

function FormAddEdit(props) {
  const { initialValues, isAdd, onSubmit } = props
  const validationSchema = Yup.object().shape({
    task: Yup.string().required('This field is required.'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {formikProps => {
        const { isSubmitting } = formikProps;
        return (
          <Form>
            <FastField
              name="task"
              label="Task"
              component={InputCustom}
              placeholder="Write your task"
            />
            <FormGroup >
              <Button type="submit" color={isAdd ? 'primary' : 'success'} className="btn-add-edit">
                {isSubmitting ? <Spinner size="sm"/> : <i className="fa fa-plus fa-sm"></i>}
                {isAdd ? ' Add task' : ' Update your task'}
              </Button>
            </FormGroup>
          </Form>)
      }}
    </Formik>)
}

FormAddEdit.propTypes = {
  isAdd: PropTypes.bool,
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object
}

FormAddEdit.defaultProps = {
  onSubmit: null,
}


export default FormAddEdit

