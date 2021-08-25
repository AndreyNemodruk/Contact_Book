/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import { createStore, compose } from 'redux';
import reducer from '../reducers/index';

const store = createStore(
  reducer,
  compose(
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      // eslint-disable-next-line no-underscore-dangle
      window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 })
  )
);

export default store;
