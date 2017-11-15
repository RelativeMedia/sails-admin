import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const EmailField = ({ disabled, inputLg, input, label, placeholder, type, meta: {valid, touched, error} }) => {
  const classes = classNames('form-group', {
    'has-error': (touched && !valid),
    'has-success': (touched && valid)
  });
  const inputClasses = classNames('form-control', {'input-lg': inputLg});

  return (<div className={classes}>
    {label &&
      <label htmlFor={input.name}>{label}</label>
    }
    <input className={inputClasses} placeholder={placeholder || label} type={type || 'email'} {...input} disabled={disabled} />
    {(!valid && touched) &&
    <p className='help-block'>{error}</p>
    }
  </div>);
};

EmailField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  inputLg: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string
};
export default EmailField;
