import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import MDEditor from 'react-markdown-editor-hybrid';

const MDEditorField = ({ tooltip, tooltipPlacement, disabled, input, label, placeholder, meta: {valid, touched, error} }) => {
  const classes = classNames('form-group', {
    'has-error': (touched && !valid),
    'has-success': (touched && valid)
  });

  return (<div className={classes}>
    {label &&
    <label htmlFor={input.name}>{label}</label>
    }
    {
      (tooltip)
        ? <OverlayTrigger placement={tooltipPlacement || 'right'} overlay={<Tooltip id={`tooltip-${input.name}`}>{tooltip}</Tooltip>}>
            <MDEditor
              value={input.defaultValue || ''}
              name={input.name}
              inputProps={{
                name: input.name,
                placeholder: placeholder || label
              }}
              onChange={param => input.onChange(param)}
              disabled={disabled}
            />
          </OverlayTrigger>
        : <MDEditor
            value={input.defaultValue || ''}
            name={input.name}
            inputProps={{
              name: input.name,
              placeholder: placeholder || label
            }}
            onChange={param => input.onChange(param)}
            disabled={disabled}
          />
    }
    {(!valid && touched) &&
    <p className='help-block'>{error}</p>
    }
  </div>);
};

MDEditorField.propTypes = {
  disabled: PropTypes.bool,
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipPlacement: PropTypes.string
};
export default MDEditorField;
