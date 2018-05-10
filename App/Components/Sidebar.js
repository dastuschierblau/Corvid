import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPosts: false
    };
  }

  render() {
    const { posts, isLoading, user } = this.props;
    const { showPosts } = this.state;

    let togglePosts = showPosts ? "Hide Posts" : "Show Posts";
    let carat = showPosts ? "&#9650" : "&#9660";

    return (
      <section className="sidebar">
        {user && (
          <Link to="/">
            <h2>Welcome, {user}!</h2>
          </Link>
        )}

        <ul className="sidebar-ul">
          {/* Display loading message while posts are being fetched */}
          {isLoading && <h3>Loading...</h3>}

          {user &&
            !isLoading && (
              <li
                className={classnames("sidebar-item toggle-posts", {
                  isShown: !showPosts
                })}
                onClick={() => {
                  this.setState(prevState => ({
                    showPosts: !prevState.showPosts
                  }));
                }}
              >
                {togglePosts}
                <span dangerouslySetInnerHTML={{ __html: carat }} />
              </li>
            )}

          {/* Render user's posts */}
          {!isLoading &&
            posts.map(item => {
              return (
                <Link to={`/${item.id}`} key={item.id}>
                  <li
                    className={classnames("sidebar-item sidebar-post", {
                      active: showPosts
                    })}
                  >
                    {item.title}
                  </li>
                </Link>
              );
            })}

          {/* Add post button */}
          {user &&
            !isLoading && (
              <Link to="/addPost">
                <li className="addPost sidebar-item">Add Post</li>
              </Link>
            )}
        </ul>
      </section>
    );
  }
}

function mapStateToProps({ posts, loading, userAuth }) {
  return {
    posts,
    isLoading: loading.isLoading,
    user: userAuth.user
  };
}

export default connect(mapStateToProps)(Sidebar);
