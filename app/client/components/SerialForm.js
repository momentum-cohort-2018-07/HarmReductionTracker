import React from 'react'
import {Button, Control, Label} from 'bloomer'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'

class SerialForm extends React.Component {
  constructor () {
    super()
    this.state = {
      inputtingSerials: true,
      serialNumbers: []
    }
  }

  render () {
    return (
      <div className='container'>
        <Formik
          initialValues={{ serialNumbers: [''] }}
          validate={values => {
            let errors = {}
            errors.serialNumbers = []
            for (let i = 0; i < values.serialNumbers.length; i++) {
              errors.serialNumbers[i] = values.serialNumbers[i] ? null : 'Required'
            }
            if (errors.serialNumbers.every(err => err === null)) {
              delete errors['serialNumbers']
            }
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false)
            this.props.resultsConcat(values.serialNumbers)
            this.props.setForm()
          }}
        >
          {({ values, isSubmitting }) => (
            <div>
              <Form>
                <FieldArray name='serialNumbers' render={arrayHelpers => (
                  <React.Fragment>
                    {values.serialNumbers.map((el, i) => (
                      <Control key={i}>
                        <Label htmlFor={`serialNumbers[${i}]`}>Enter serial number</Label>
                        <Field type='text' name={`serialNumbers[${i}]`} />
                        <ErrorMessage name={`serialNumbers[${i}]`} component='div' />
                        <Button className='serial-form-button button' type='button' onClick={() => arrayHelpers.remove([i])}>Delete Input</Button>
                      </Control>
                    ))}
                    <Button className='serial-form-button button' type='button' onClick={() => arrayHelpers.push('')}>Add Input</Button>
                  </React.Fragment>
                )} />
                <Button className='serial-form-button button' type='submit' disabled={isSubmitting}>Submit</Button>
              </Form>
              <div>
                <Button className='serial-form-button button' type='button' onClick={this.props.setQr}>Scan QR code</Button>
              </div>
            </div>
          ) }
        </Formik>
      </div>
    )
  }
}
export default SerialForm
