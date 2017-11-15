import React from 'react';

import './style.scss';
const IsNotLoading = ({ isLoading = true, children }) => {
  return (isLoading)
    ? (<div className='IsNotLoading'>
      <div className='container'>
        <p className='well text-center'>
          <i className='fa fa-circle-o-notch fa-spin fa-3x fa-fw'/>
        </p>
      </div>
    </div>)
    : {children};
};
export default IsNotLoading;
