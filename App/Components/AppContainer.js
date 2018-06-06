/* AppContainer component */
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect, Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App.js";

import { posts, suggestions, userAuth, loading } from "../Reducers/index.js";
import { logger } from "../Middleware/logger.js";

import { createStore, applyMiddleware, combineReducers } from "redux";

/* Create store */
const store = createStore(
  combineReducers({ posts, suggestions, userAuth, loading }),
  applyMiddleware(logger, thunk)
);

class AppContainer extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route render={props => <App {...props} />} />
        </Router>
      </Provider>
    );
  }
}

export default AppContainer;
