import { createStore, compose } from "redux";
import reducer from "../reducers/index.js";

const store = createStore(reducer, compose(
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({ trace: true, traceLimit: 25 }))
);

window.store = store;

export default store;
