import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import {Notification} from 'containers/Notification';
import config from 'config';

class AuthLayout extends React.Component {
  static propTypes = {
    children: PropTypes.element
  };

  render() {
    const {
      children
    } = this.props;

    return (<div className='AuthLayoutComponent'>
      <Helmet
        titleTemplate={`${config.APP_TITLE} | %s`}
        defaultTitle={config.APP_TITLE}
      />
      <Grid>
        <Notification />
        {children}
      </Grid>
    </div>);
  }
}

export default AuthLayout;
