import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import classNames from 'classnames';

class TextAreaField extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    disabled: PropTypes.bool,
    initialValue: PropTypes.string,
    input: PropTypes.object.isRequired,
    inputLg: PropTypes.bool,
    label: PropTypes.string,
    meta: PropTypes.object.isRequired,
    rows: PropTypes.number,
    tooltip: PropTypes.string,
    tooltipPlacement: PropTypes.string
  }
  static defaultProps = {}

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    const {autoFocus, input} = this.props;
    if (autoFocus) {
      this.refs[input.name].focus();
    }
  }

  render() {
    const {tooltip, tooltipPlacement, disabled, initialValue, inputLg, input, label, rows, meta: {valid, touched, error}} = this.props;

    const classes = classNames('form-group', {
      'has-error': (touched && !valid),
      'has-success': (touched && valid)
    });
    const inputClasses = classNames('form-control', {'input-lg': inputLg});

    const _textarea = (<textarea
      className={inputClasses}
      {...input}
      ref={input.name}
      onChange={input.onChange}
      disabled={disabled}
      rows={rows || 3}
    >
        {initialValue}
      </textarea>);
    return (<div className={classes}>
      {label && <label htmlFor={input.name}>{label}</label>}
      {(tooltip)
        ? <OverlayTrigger placement={tooltipPlacement || 'right'} overlay={<Tooltip id={`tooltip-${input.name}`}>{tooltip}</Tooltip>}>
            {_textarea}
          </OverlayTrigger>
        : _textarea
      }
      {(!valid && touched) &&
      <p className='help-block'>{error}</p>
      }
    </div>);
  }
}

export default TextAreaField;
