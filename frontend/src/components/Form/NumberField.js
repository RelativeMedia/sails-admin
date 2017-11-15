import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const NumberField = ({ prepend, append, disabled, inputLg, input, label, placeholder, type, meta: {valid, touched, error} }) => {
  const classes = classNames('form-group', {
    'has-error': (touched && !valid),
    'has-success': (touched && valid)
  });
  const inputClasses = classNames('form-control', {'input-lg': inputLg});

  const _input = (<input
    {...input}
    className={inputClasses}
    placeholder={placeholder || label}
    type={type || 'number'}
    disabled={disabled}
  />);

  return (<div className={classes}>
    {label &&
      <label htmlFor={input.name}>{label}</label>
    }
    {(prepend || append)
      ? <div className='input-group'>
        {(prepend) && <div className='input-group-addon'>{prepend}</div> }
        {_input}
        {(append) && <div className='input-group-addon'>{append}</div> }
      </div>
      : _input
    }
    {(!valid && touched) &&
      <p className='help-block'>{error}</p>
    }
  </div>);
};

NumberField.propTypes = {
  append: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
    PropTypes.element
  ]),
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  inputLg: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  prepend: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
    PropTypes.element
  ]),
  type: PropTypes.string
};
export default NumberField;
