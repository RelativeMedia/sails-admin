import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Radium, {StyleRoot} from 'radium';
import { shake } from 'react-animations';
import Layouts from 'layouts';
import {Services} from 'services';
import LoginForm from './components/LoginForm';

class LoginContainer extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    form: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      submitFailed: false
    };
  }

  handleSubmit = () => {
    const {
      login,
      form
    } = this.props;

    const {
      router
    } = this.context;

    this.setState({
      submitting: true
    });

    return login({
      identity: form.LoginForm.values.identity,
      password: form.LoginForm.values.password,
      loginType: form.LoginForm.values.loginType || 'local'
    })
      .then(() => {
        this.setState({
          submitting: false
        });

        router.history.replace('/');
      })
      .catch(() => {
        this.setState({
          submitting: false,
          submitFailed: false
        });

        this.setState({
          submitting: false,
          submitFailed: true
        });
      });
  }

  render() {


    const styles = {
      shake: {
        animation: 'x 0.5s',
        animationName: Radium.keyframes(shake, 'shake')
      }
    };

    return (<StyleRoot>
      <Layouts.Auth>
        <div style={(this.state.submitFailed) ? styles.shake : null} className='LoginContainer'>
          <Helmet>
            <title>Login</title>
          </Helmet>
          <LoginForm
            onSubmit={this.handleSubmit}
          />
        </div>
      </Layouts.Auth>
    </StyleRoot>);
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  form: state.form,
  isLoading: state.isLoading['AUTH'],
  hasResults: state.hasResults['AUTH']
});

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(Services.Auth.login(payload))
});
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
