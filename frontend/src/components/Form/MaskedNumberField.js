import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputMask from 'react-input-mask';

const MaskedNumberField = ({ disabled, alwaysShowMask, mask, maskChar, inputLg, input, label, placeholder, type, meta: {valid, touched, error} }) => {
  const classes = classNames('form-group', {
    'has-error': (touched && !valid),
    'has-success': (touched && valid)
  });
  const inputClasses = classNames('form-control', {'input-lg': inputLg});

  return (<div className={classes}>
    {label &&
      <label htmlFor={input.name}>{label}</label>
    }
    <InputMask
      {...input}
      placeholder={placeholder || label}
      type={type || 'num'}
      className={inputClasses}
      mask={mask || '9999-9999-9999-9999'}
      maskChar={maskChar || ' '}
      alwaysShowMask={alwaysShowMask || true}
      disabled={disabled}
    />
    {(!valid && touched) &&
      <p className='help-block'>{error}</p>
    }
  </div>);
};

MaskedNumberField.propTypes = {
  alwaysShowMask: PropTypes.bool,
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  inputLg: PropTypes.bool,
  label: PropTypes.string,
  mask: PropTypes.string,
  maskChar: PropTypes.string,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string
};
export default MaskedNumberField;
