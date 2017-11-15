import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class TextField extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
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
    meta: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string
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
    const {disabled, defaultValue, inputLg, input, label, placeholder, type, meta: {valid, touched, error}} = this.props;

    const classes = classNames('form-group', {
      'has-error': (touched && !valid),
      'has-success': (touched && valid)
    });
    const inputClasses = classNames('form-control', {'input-lg': inputLg});

    return (<div className={classes}>
      {label && <label htmlFor={input.name}>{label}</label>}
      <input
        {...input}
        value={defaultValue || input.value}
        className={inputClasses}
        placeholder={placeholder}
        type={type || 'text'}
        ref={input.name}
        disabled={disabled}
      />
      {(!valid && touched) &&
      <p className='help-block'>{error}</p>
      }
    </div>);
  }
}

export default TextField;
