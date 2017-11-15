import React from 'react';
import {Link} from 'react-router';

import './style.scss';
const NotAuthorizedComponent = () => (<div className='NotAuthorizedComponent'>
  <div className='container'>
    <div className='col-xs-12 text-center well'>
      <h4>You are not authorized to view this route.</h4>
      <Link to='/'>Go Home</Link>
    </div>
  </div>
</div>);
export default NotAuthorizedComponent;
