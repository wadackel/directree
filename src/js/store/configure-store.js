import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import createLogger from "redux-logger"
import reducers from "../reducers"

const logger = createLogger();

export default function configureStore(initialState) {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(
      thunk
    )(createStore)(reducers);

  } else {
    return applyMiddleware(
      thunk,
      logger
    )(createStore)(reducers);
  }
}
