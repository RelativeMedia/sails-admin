import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Layouts from 'layouts';

class HomeContainer extends React.Component {
  static propTypes = {
    children: PropTypes.element
  };

  render() {
    return (<Layouts.Base>
      <div className='HomeContainer'>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <h1>Home</h1>
      </div>
    </Layouts.Base>);
  }
}

export default HomeContainer;
