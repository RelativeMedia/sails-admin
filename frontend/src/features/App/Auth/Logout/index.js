import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Layouts from 'layouts';
import { Services } from 'services';

class LogoutContainer extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    logout: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount () {
    const {
      logout
    } = this.props;

    const {
      router
    } = this.context;

    logout()
      .then(() => {
        router.history.replace('/login');
      });
  }

  render () {
    return (<Layouts.Auth>
      <div className='LoginContainer'>
        <Helmet>
          <title>Logout</title>
        </Helmet>
      </div>
    </Layouts.Auth>);
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(Services.Auth.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutContainer);
