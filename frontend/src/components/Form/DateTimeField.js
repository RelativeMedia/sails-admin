import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DateTime from 'react-datetime';

const DateTimeField = ({ disabled, input, label, meta: {valid, touched, error} }) => {
  const classes = classNames('form-group', {
    'has-error': (touched && !valid),
    'has-success': (touched && valid)
  });

  return (<div className={classes}>
    {label &&
        <label htmlFor={input.name}>{label}</label>
    }
    <DateTime
      name={input.name}
      locale='en'
      dateFormat='MM/DD/YYYY'
      timeFormat='hh:mm A'
      value={input.value}
      onChange={(param) => input.onChange(param)}
      disabled={disabled}
    />
    {(!valid && touched) &&
      <p className='help-block'>{error}</p>
    }
  </div>);
};

DateTimeField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.string
};
export default DateTimeField;
