import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import {reducer as formReducer} from 'redux-form';
import notificationReducer from 'containers/Notification';
import dataReducer from 'reducers/data';
import authReducer from 'reducers/auth';
import {hasErrorReducer, hasResultsReducer, isLoadingReducer} from 'reducers/StateKeys';

const rootReducer = combineReducers({
  router: routerReducer,
  isLoading: isLoadingReducer,
  hasResults: hasResultsReducer,
  hasErrors: hasErrorReducer,
  notifications: notificationReducer,
  auth: authReducer,
  data: dataReducer,
  form: formReducer,

});

export default rootReducer;
