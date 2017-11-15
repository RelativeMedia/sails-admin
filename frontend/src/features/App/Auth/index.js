import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Services} from 'services';
import Login from './Login';
import Logout from './Logout';

  const isRequired = (WrappedComponent) => {
  class AuthRequiredComponent extends React.Component {
      static propTypes = {
          auth: PropTypes.object.isRequired,
          router: PropTypes.object.isRequired,
          setupAuth: PropTypes.func.isRequired
      };
      static defaultProps = {
          isAuthenticated: false,
          isAuthenticating: false
      };

      static contextTypes = {
        router: PropTypes.object.isRequired
      }

      componentWillMount() {
        const {
          auth,
          setupAuth
        } = this.props;

        if ((!auth.user || !auth.token) && Services.Auth.isAuthenticated()) {
          setupAuth();
        } else {
          if (!auth.isAuthenticated) {
            this.checkAuth(auth.isAuthenticated);
          }
        }
      }

      componentWillReceiveProps(nextProps) {
        const {auth} = nextProps;
        this.checkAuth(auth.isAuthenticated);
        // this.checkAdmin(auth.user.groups.some((g) => g.slug === 'admin'));
      }

      checkAuth (isAuthenticated = false) {
        const {router} = this.context;
        if (!isAuthenticated) {
          router.history.replace('/login');
        }
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
  }

  const mapStateToProps = (state) => ({
    auth: state.auth,
    router: state.router
  });

  const mapDispatchToProps = (dispatch) => ({
    setupAuth: () => dispatch(Services.Auth.setup())
  });
  return connect(mapStateToProps, mapDispatchToProps)(AuthRequiredComponent);
};

export default {
    Login,
    Logout,
    isRequired
};
