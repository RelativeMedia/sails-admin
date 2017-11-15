import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const SelectField = ({ defaultValue, multiple, disabled, options, input, inputLg, label, meta: {valid, touched, error} }) => {
  const classes = classNames('form-group', {
    'has-error': (touched && !valid),
    'has-success': (touched && valid)
  });
  const inputClasses = classNames('form-control', {'input-lg': inputLg});

  return (<div className={classes}>
    {label &&
      <label htmlFor={input.name}>{label}</label>
    }
    <select className={inputClasses} {...input} disabled={disabled} multiple={multiple} defaultValue={defaultValue}>
      {(!defaultValue) &&
        <option value=''>{`--- Pick ${(multiple) ? 'One or More' : 'One'}---`}</option>
      }
      {options.map((o, k) => (<option key={k} value={o.value}>
        {(o.abbreviation)
          ? `(${o.abbreviation}) ${o.label}`
          : `${o.label}`
        }
      </option>))}
    </select>
    {(!valid && touched) &&
      <p className='help-block'>{error}</p>
    }
  </div>);
};

SelectField.propTypes = {
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  inputLg: PropTypes.bool,
  label: PropTypes.string,
  meta: PropTypes.object.isRequired,
  multiple: PropTypes.bool,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

export default SelectField;
