import {createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {reducers} from "../../state/reducers/index";

export const store = createStore(reducers, {}, 
    compose(
        applyMiddleware(logger, thunk),
        (window).__REDUX_DEVTOOLS_EXTENSION__ &&
          (window).__REDUX_DEVTOOLS_EXTENSION__()
      )
);
