import React from 'react';
import PropTypes from 'prop-types';

const PageTitle = ({ title }) => (<div>
  <div className='row'>
    <div className='col-lg-12'>
      <h1>{title}</h1>
    </div>
  </div>
  <div className='row'>
    <div className='col-lg-12'>
      <hr />
    </div>
  </div>
</div>);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default PageTitle;
