import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
const NoResultsComponent = ({ visible = false, children}) => {
  return (visible)
    ? (<div className='NoResultsComponent'>
      <div className='container'>
        <p className='well text-center'>
          <strong>No Results found</strong>
        </p>
      </div>
    </div>)
    : children || null;
};

NoResultsComponent.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.element
};
export default NoResultsComponent;
