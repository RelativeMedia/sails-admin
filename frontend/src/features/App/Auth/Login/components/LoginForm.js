import React from 'react';
import PropTypes from 'prop-types';
import {Field, reduxForm} from 'redux-form';
import Form from 'components/Form';

import './styles.scss';
class LoginFormComponent extends React.Component {
  static propTypes = {
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    submitSucceeded: PropTypes.bool.isRequired,
    submitFailed: PropTypes.bool.isRequired,
    submit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }
  render () {

    const {
      invalid,
      submitting,
      submit,
      reset
    } = this.props;

    return (<div className='LoginFormComponent'>
      <form onSubmit={submit}>
        <div className='col-lg-offset-3 col-lg-6'>
          <div className='panel panel-default'>
            <div className='panel-heading'>
              <h3 className='panel-title'>Sign In</h3>
            </div>
            <div className='panel-body'>
              <Field
                name='identity'
                label='Username or Email'
                placeholder='gordon.freeman@srpnet.com'
                inputLg
                component={Form.TextField}
                required
              />
              <Field
                name='password'
                label='Password'
                inputLg
                toggle
                required
                component={Form.PasswordField}
              />
              <div className='row'>
                <div className='col-lg-4'>
                  <Field
                    name='loginType'
                    label='Login Type'
                    component={Form.SelectField}
                    defaultValue='local'
                    options={[
                      {
                        value: 'local',
                        label: 'Local'
                      },
                      {
                        value: 'ad',
                        label: 'AD'
                      }
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className='panel-footer'>
              <div className='btn-group'>
                <button
                className='btn btn-lg btn-default'
                type='button'
                disabled={submitting}
                onClick={reset}
                >
                  Cancel
                </button>
                <button
                  className='btn btn-lg btn-primary'
                  type='submit'
                  disabled={invalid || submitting}
                  onClick={submit}
                >
                  {(submitting)
                    ? <i className='fa fa-spin fa-spinner' />
                    : 'Sign In'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>);
  }
}

const validate = (values) => {
  let errors = {};
  if (!values.identity) {
    errors.identity = 'Identity is Required';
  }

  if (!values.password) {
    errors.password = 'Password is Required';
  }

  return errors;
};

export default reduxForm({
  form: 'LoginForm',
  validate
})(LoginFormComponent);
