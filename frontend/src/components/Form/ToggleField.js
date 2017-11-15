import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Switch from 'react-bootstrap-switch';

import './ToggleField.scss';
class ToggleField extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    bsSize: PropTypes.string,
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
      PropTypes.element
    ]),
    disabled: PropTypes.bool,
    input: PropTypes.object.isRequired,
    inputLg: PropTypes.bool,
    label: PropTypes.string,
    labelText: PropTypes.string,
    meta: PropTypes.object.isRequired,
    offColor: PropTypes.string,
    offText: PropTypes.string,
    onColor: PropTypes.string,
    onText: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string
  }
  static defaultProps = {}

  constructor(props) {
    super(props);

    this.state = {
      toggled: false
    };
  }

  componentDidMount () {
    const {autoFocus, input} = this.props;
    if (autoFocus) {
      this.refs[input.name].focus();
    }
  }

  render() {
    const {
      bsSize,
      disabled,
      defaultValue,
      input,
      label,
      offText,
      onText,
      offColor,
      onColor,
      labelText,
      meta: {valid, touched, error}
    } = this.props;

    const classes = classNames('form-group', {
      'has-error': (touched && !valid),
      'has-success': (touched && valid)
    });

    return (<div className={classes}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <div className='row'>
        <div className='col-xs-12'>
          <Switch
            name={input.name}
            disabled={disabled}
            defaultValue={defaultValue || false}
            bsSize={bsSize || 'normal'}
            offText={offText}
            onText={onText}
            offColor={offColor}
            onColor={onColor}
            labelText={labelText}
            onChange={(elm, state) => input.onChange(state)}
          />
        </div>
      </div>
      {(!valid && touched) &&
      <p className='help-block'>{error}</p>
      }
    </div>);
  }
}

export default ToggleField;
