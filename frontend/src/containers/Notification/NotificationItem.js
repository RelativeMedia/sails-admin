import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Alert} from 'react-bootstrap';

function NotificationItem({style, title, message, dismissible, handleClick}) {
  const _style = (style === 'error') ? 'danger' : style;
  return (<ReactCSSTransitionGroup
    transitionName='Notification-Alert-Fade'
    transitionEnterTimeout={250}
    transitionAppear={true}
    transitionAppearTimeout={250}
    transitionLeaveTimeout={150}>
    <Alert
      bsStyle={_style}
      onDismiss={(dismissible) ? handleClick : null}
    >
      {(title) &&
      <h4>{title}</h4>
      }
      {message}
    </Alert>
  </ReactCSSTransitionGroup>);
}

NotificationItem.propTypes = {
  dismissible: PropTypes.bool,
  handleClick: PropTypes.func,
  message: PropTypes.string.isRequired,
  style: PropTypes.string,
  title: PropTypes.string
};

NotificationItem.defaultProps = {
  style: 'info',
  dismissible: true
};

export default NotificationItem;
