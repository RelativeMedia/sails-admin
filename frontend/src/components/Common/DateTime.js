import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const DateTimeComponent = ({ date = new Date(), format = 'MM/DD/YYYY HH:mm:ss' }) => {
  const _date = moment(date).format(format);
  return (<span>
    {_date}
  </span>);
};
DateTimeComponent.propTypes = {
  date: PropTypes.string,
  format: PropTypes.string
};
export default DateTimeComponent;
