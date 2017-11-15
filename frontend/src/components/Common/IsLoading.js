import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
const IsLoadingComponent = ({ visible, children }) => {
  console.log(visible, children);
  return (visible)
    ? (<div className='IsLoadingComponent'>
      <div className='container'>
        <p className='well text-center'>
          <i className='fa fa-circle-o-notch fa-spin fa-3x fa-fw'/>
        </p>
      </div>
    </div>)
    : children || null;
};

IsLoadingComponent.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.element
};

export default IsLoadingComponent;
