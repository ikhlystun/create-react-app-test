import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import ShareButton from "../ShareButton";
import LikeButton from "../LikeButton";

import "./style.css";

export default class Post extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLiked: false
    };

    this.handleClickIsLiked = this.handleClickIsLiked.bind(this);
  }

  handleClickIsLiked() {
    const returnObj = JSON.parse(
      localStorage.getItem("env_react_sharing_posts")
    );
    let serialObj;

    this.setState(prevState => {
      return { isLiked: !prevState.isLiked };
    });

    if (returnObj.length === 0) {
      returnObj.push({ id: this.props.post.id, liked: !this.state.isLiked });
    } else {
      let found = returnObj.some(post => {
        return post.id === this.props.post.id;
      });

      if (found) {
        returnObj.forEach(post => {
          if (post.id === this.props.post.id) {
            post.liked = !this.state.isLiked;
          }
        });
      } else {
        returnObj.push({ id: this.props.post.id, liked: !this.state.isLiked });
      }
    }

    serialObj = JSON.stringify(returnObj);
    localStorage.setItem("env_react_sharing_posts", serialObj);
  }

  componentDidMount() {
    if (localStorage.getItem("env_react_sharing_posts") === null) {
      localStorage.setItem("env_react_sharing_posts", JSON.stringify([]));
    } else {
      const returnObj = JSON.parse(
        localStorage.getItem("env_react_sharing_posts")
      );

      returnObj.forEach(post => {
        if (post.id === this.props.post.id) {
          this.setState(() => {
            return { isLiked: post.liked };
          });
        }
      });
    }
  }

  render() {
    const { post } = this.props;

    return (
      <div className={"post" + (this.state.isLiked ? " post--liked" : "")}>
        <Link
          className="post__body"
          to={{ pathname: `/modal/${post.id}`, state: { modal: true } }}
        >
          <img src={post.img} alt={post.title} />
        </Link>
        <div className="post__bottom">
          <div className="post__buttons">
            <LikeButton
              isLiked={this.state.isLiked}
              handleClickIsLiked={this.handleClickIsLiked.bind(this)}
            />
            <ShareButton post={post} />
          </div>
          <div className="post__title">
            {post.title}
            <br />
            <strong>Type: {post.type}</strong>
          </div>
        </div>
      </div>
    );
  }
}
