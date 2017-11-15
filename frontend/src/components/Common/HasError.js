import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';
const HasErrorComponent = ({errors}) => (<p className='well text-center'>
  {(errors)
    ? errors.map((e, i) => (<li key={i}>{e}</li>))
    : 'Whoops! A General Server Error Occured.'
  }
</p>);
HasErrorComponent.propTypes = {
  errors: PropTypes.array
};
export default HasErrorComponent;
