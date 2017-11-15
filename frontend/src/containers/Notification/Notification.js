import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classNames from 'classnames';

import {Notify} from 'containers/Notification';
import NotificationItem from './NotificationItem';

import './style.scss';

class Notification extends Component {
  static propTypes = {
    devMode: PropTypes.bool.isRequired,
    notifications: PropTypes.object
  }
  static defaultProps = {
    devMode: false
  }
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  emitNotification = () => {
    const {dispatch} = this.context.store;
    dispatch(Notify.emit({
      title: new Date().toTimeString(),
      style: 'error',
      message: 'test1',
      dismissible: false
    }));
  }

  removeNotification = (e, count = 1) => {
    event.preventDefault();
    const {dispatch} = this.context.store;
    if (this.refs.count) {
      count = this.refs.count.value;
    }

    dispatch(Notify.remove(count));
  }

  render() {
    const {notifications, devMode} = this.props;
    const _notifications = notifications.items.map((n, k) => (
      <NotificationItem key={k} {...n} handleClick={(e) => this.removeNotification(e)}/>));
    const classes = classNames('NotificationComponent', {
      'devMode': (devMode),
      'isEmpty': (notifications.items.length === 0 && devMode !== true)
    });

    return (<div className={classes}>
      {(devMode) &&
      <div>
        <button className='btn btn-block btn-success' onClick={this.emitNotification}>Emit Notification</button>
        <hr/>
        <div className='input-group'>
          <input className='form-control' type='number' defaultValue={1} ref='count' placeholder='Num' minLength='1'
                 maxLength='2'/>
          <div className='input-group-btn'>
            <button
              className='btn btn-block btn-danger'
              onClick={(e) => this.removeNotification(e)}
              disabled={notifications.items.length === 0 && notifications.queue.length === 0}
            >
              Remove Notification(s)
            </button>
          </div>
        </div>
        <hr />
        <ul>
          <li>Notifications: {(notifications.items) && notifications.items.length}</li>
          <li>Notifications Queued: {(notifications.queue) && notifications.queue.length}</li>
        </ul>
        <hr />
      </div>
      }
      {_notifications}
    </div>);
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notifications
});
export default connect(mapStateToProps)(Notification);
