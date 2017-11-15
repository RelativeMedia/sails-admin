import notificationReducer, {emit, remove} from './reducer';
export Notification from './Notification';

export const Notify = {
  emit,
  remove
};

export default notificationReducer;
