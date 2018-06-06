const React = require("react"),
  { Redirect } = require("react-router-dom"),
  { formatDate } = require("../utils/helpers.js"),
  { connect } = require("react-redux");

import {
  setCurrentPost,
  resetSuggestions,
  removePost
} from "../Actions/shared.js";

/* Util function implementing newlines found inside of strings. */
function enableNewlines(str, codeTag) {
  if (codeTag === true) {
    return str.split("\n").map((item, index) => {
      return <code key={index}>{item}</code>;
    });
  } else {
    const newLines = str
      .split("\n")
      .map((item, index) => <p key={index}>{item}</p>);

    return newLines;
  }
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(resetSuggestions());
  }

  handleDelete() {
    const { id } = this.props.currentPost;
    let okToDelete = confirm("Are you sure you want to delete this post?");

    if (okToDelete) {
      this.props.dispatch(removePost(id));
    }
  }

  render() {
    const { currentPost } = this.props;
    const { content, code } = currentPost;

    if (!currentPost) {
      return <Redirect to="/" />;
    }

    return (
      <div className="post-wrapper">
        <div className="post">
          <div key>
            <img
              className="delete-icon"
              src={require("../Images/trashbin.svg")}
              onClick={this.handleDelete}
              alt="Trash can icon"
            />

            <h1>{currentPost.title}</h1>
            {enableNewlines(content)}
            {code ? enableNewlines(code, true) : null}

            <ul className="tag-list">
              {currentPost.keywords.map(item => {
                return <li key={item}>{item}</li>;
              })}
            </ul>

            <footer>
              <ul className="footer-left">
                <li>{currentPost.author}</li>
                <li>{formatDate(currentPost.timestamp)}</li>
              </ul>

              <ul className="footer-right">
                <li>{/*Edit*/}</li>
                <li>{/*Remove*/}</li>
              </ul>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts, suggestions }, { match }) {
  const { postId } = match.params;
  const post = posts.filter(({ id }) => {
    return id === postId;
  });

  if (!post) {
    return {
      currentPost: null
    };
  }

  return {
    currentPost: post[0],
    posts,
    suggestions
  };
}

module.exports = connect(mapStateToProps)(Post);
