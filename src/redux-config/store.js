import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./compose-reducer";

const composeEnhancer = compose(
  applyMiddleware(thunk),
);

const store = createStore(
  reducers,
  composeEnhancer,
);

export default store;
