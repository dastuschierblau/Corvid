import React from "react";
import { connect } from "react-redux";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import Post from "./Post.js";
import AddPost from "./AddPost.js";
import Searchbar from "./Searchbar.js";
import Homepage from "./Homepage.js";
import Sidebar from "./Sidebar.js";
import Login from "./Login.js";

import {
  login,
  logout,
  toggleLoading,
  addPost,
  removePost,
  receivePosts,
  emptyPosts,
  handleReceivePosts
} from "../Actions/shared.js";
import { getInitialData } from "../utils/API.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.dispatch(emptyPosts());
    this.props.dispatch(logout());
    this.props.history.push("/");
  }

  componentDidMount() {}

  render() {
    const { posts, match } = this.props;
    const { user } = this.props.login;
    const { isLoading } = this.props.loading;
    const searchbar = document.querySelector(".searchbar");

    return (
      <div className="container-wrapper">
        <nav className="nav">
          {user && (
            <button className="login-btn" onClick={this.logout}>
              Logout
            </button>
          )}

          <h1>CORVID</h1>
        </nav>

        <Login />

        {!user && <Redirect to="/" />}

        <div className="container">
          {/* Display the search tab feature only when user is logged in and initial posts are loaded */}
          {user && !isLoading && <Searchbar el={searchbar} {...this.props} />}

          {/* Sidebar component */}
          <Sidebar />

          <Switch>
            {!user && (
              <Route
                exact
                path="/"
                render={() => {
                  return (
                    <span class="landing-page-wrapper">
                      <div className="overlay" />
                      <div className="landing-page">
                        <h1 className="initial-greeting">Please log in</h1>
                      </div>
                    </span>
                  );
                }}
              />
            )}

            {user && (
              <Route
                exact
                path="/"
                render={() => {
                  return <Homepage />;
                }}
              />
            )}

            {user && <Route path="/addPost" component={AddPost} />}

            {user && (
              <Route
                path="/:postId"
                render={props => {
                  return <Post {...props} />;
                }}
              />
            )}

            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts, loading, userAuth }) {
  return {
    posts,
    login: userAuth,
    loading
  };
}

const ConnectedApp = connect(mapStateToProps)(App);

export default ConnectedApp;
