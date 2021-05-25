import React from 'react'
import { FastField, Form, Formik } from 'formik';
import PropTypes from 'prop-types'
import { Button, FormGroup, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import InputCustom from 'components/InputCustom'
import { useDispatch, useSelector } from 'react-redux';
import { updateIsEditMode } from 'app/todoSlice';

function FormAddEdit(props) {
  const isEditMode = useSelector(state => state.todos.isEditMode)
  const initialValues = useSelector(state => state.todos.initTask)
  const { onSubmit } = props
  const dispatch = useDispatch()
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
      validateOnChange={true}
      validateOnMount={false}
    >
      {formikProps => {
        const { isSubmitting, setFieldValue, setFieldTouched } = formikProps;

        const cancelEdit = () => {
          setFieldValue('task', '')
          dispatch(updateIsEditMode(false))
          setFieldTouched('task', false, false)
        }

        return (
          <Form>
            <FastField
              name="task"
              label="Task"
              component={InputCustom}
              placeholder="Write your task"
              validate={validationSchema}
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
  onSubmit: PropTypes.func
}

FormAddEdit.defaultProps = {
  onSubmit: null,
}


export default FormAddEdit

