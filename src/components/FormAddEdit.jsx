import React from 'react'
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types'
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import InputCustom from './InputCustom'
import { useAppContext } from '../contexts/appContext'

function FormAddEdit(props) {
  const { isEditMode, updateIsEditMode } = useAppContext()
  const { initialValues, onSubmit } = props

  const validationSchema = Yup.object().shape({
    task: Yup.string().required('This field is required.'),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnBlur={true}
    >
      {formikProps => {
        const { isSubmitting, setFieldValue} = formikProps;

        const cancelEdit = () => {
          setFieldValue('task','')
          updateIsEditMode(false)
        }

        return (
          <Form>
            <FastField
              name="task"
              label="Task"
              component={InputCustom}
              placeholder="Write your task"
            />
            <FormGroup >
              <Button type="submit" color={isEditMode ? 'primary' : 'success'} className="btn-add-edit">
                {isSubmitting ? <Spinner size="sm" /> : <i className="fas fa-save" />}
                {" Save"}
              </Button>
              {isEditMode &&
                <Button type="button" color='info' className="btn-add-edit"
                onClick={cancelEdit}>
                  Cancel
                </Button>
              }
            </FormGroup>
          </Form>)
      }}
    </Formik>)
}

FormAddEdit.propTypes = {
  onSubmit: PropTypes.func,
  initialValues: PropTypes.object
}

FormAddEdit.defaultProps = {
  onSubmit: null,
}


export default FormAddEdit

