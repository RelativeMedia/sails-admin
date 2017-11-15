import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class PasswordField extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    input: PropTypes.object.isRequired,
    inputLg: PropTypes.bool,
    label: PropTypes.string.isRequired,
    meta: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
    toggle: PropTypes.bool,
    type: PropTypes.string
  }
  static defaultProps = {}

  constructor(props) {
    super(props);
    this.state = {
      fieldType: 'password'
    };
  }

  handleTypeChange = (e) => {
    e.preventDefault();
    const {
      fieldType
    } = this.state;

    this.setState({
      fieldType : (fieldType === 'password') ? 'text' : 'password'
    });
    return false;
  }

  render() {
    const {
      toggle,
      disabled,
      inputLg,
      input,
      label,
      placeholder,
      type,
      meta: {
        valid,
        touched,
        error
      }
    } = this.props;

    const {
      fieldType
    } = this.state;

    const classes = classNames('form-group', {
      'has-error': (touched && !valid),
      'has-success': (touched && valid)
    });

    const inputClasses = classNames('form-control', {'input-lg': inputLg});
    const isPassword = () => {
      return (fieldType === 'password');
    };

    const btnClasses = classNames('btn', 'btn-default', {
      'btn-lg': inputLg
    });

    return (<div className={classes}>
      {label &&
      <label htmlFor={input.name}>{label}</label>
      }
      {(toggle)
        ? <div className='input-group'>
          <input className={inputClasses} placeholder={placeholder || label} type={(toggle) ? fieldType : type || 'password'} {...input} disabled={disabled} />
          <div className='input-group-btn'>
            <button type='button' className={btnClasses} onClick={(e) => this.handleTypeChange(e)}>
              <i className={classNames('fa', { 'fa-eye': !isPassword(), 'fa-eye-slash': isPassword() })} />
            </button>
          </div>
        </div>
        : <input className={inputClasses} placeholder={placeholder || label} type={type || 'password'} {...input} disabled={disabled}/>
      }
      {(!valid && touched) &&
      <p className='help-block'>{error}</p>
      }
    </div>);
  }
}

export default PasswordField;
//const PasswordField = ({ toggle, disabled, inputLg, input, label, placeholder, type, meta: {valid, touched, error} }) => {
//  const classes = classNames('form-group', {
//    'has-error': (touched && !valid),
//    'has-success': (touched && valid)
//  })
//  const inputClasses = classNames('form-control', {'input-lg': inputLg})
//
//  let isPasswordField = true
//  let _type = 'password'
//  const handleToggle = (e) => {
//    e.preventDefault()
//    if (_type === 'password') {
//      _type = 'text'
//      isPasswordField = false
//    } else {
//      _type = 'password'
//      isPasswordField = true
//    }
//  }
//
//  return (<div className={classes}>
//    {label &&
//      <label htmlFor={input.name}>{label}</label>
//    }
//    {(toggle)
//      ? <div className='input-group'>
//          <input className={inputClasses} placeholder={placeholder || label} type={(toggle) ? _type : 'password'} {...input} disabled={disabled} />
//        <div className='input-group-btn'>
//          <button type='button' className='btn btn-lg btn-default' onClick={(e) => handleToggle(e) }>
//            <i className={classNames('fa', { 'fa-eye': !isPasswordField, 'fa-eye-slash': isPasswordField })} />
//          </button>
//        </div>
//      </div>
//      : <input className={inputClasses} placeholder={placeholder || label} type={type || 'password'} {...input} disabled={disabled}/>
//    }
//    {(!valid && touched) &&
//    <p className='help-block'>{error}</p>
//    }
//  </div>)
//}
//
//PasswordField.propTypes = {
//  disabled: PropTypes.bool,
//  input: PropTypes.object.isRequired,
//  inputLg: PropTypes.bool,
//  label: PropTypes.string.isRequired,
//  toggle: PropTypes.bool,
//  meta: PropTypes.object.isRequired,
//  placeholder: PropTypes.string,
//  type: PropTypes.string
//}
//export default PasswordField
