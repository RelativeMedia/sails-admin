import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import {Notification} from 'containers/Notification';
import config from 'config';
import Navigation from 'components/Navigation';

class BaseLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    auth: PropTypes.object.isRequired
  };

  render() {
    const {
      children,
      auth
    } = this.props;

    return (<div className='BaseLayoutComponent'>
      <Helmet
        titleTemplate={`${config.APP_TITLE} | %s`}
        defaultTitle={config.APP_TITLE}
      />
      <Navigation user={auth.user} />
      <Grid fluid>
        <Notification />
        {children}
      </Grid>
    </div>);
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(BaseLayout);
