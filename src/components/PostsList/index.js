import React, { Component } from "react";
import Post from "../Post";

import "./style.css";

export default class PostsList extends Component {
  componentDidMount() {
    let postsToLocalStorage = [];

    // Push list of posts to Local Storage
    if (localStorage.getItem("env_react_sharing_posts") === null) {
      this.props.post.forEach(post => {
        postsToLocalStorage.push({ id: post.id, liked: false });
      });
      const serialObj = JSON.stringify(postsToLocalStorage);
      localStorage.setItem("env_react_sharing_posts", serialObj);
    }
    // End push list of posts to Local Storage
  }

  render() {
    const { post, filterValue } = this.props;
    let posts = [];

    post.forEach(post => {
      if (post.type.indexOf(filterValue) === -1) {
        return;
      }
      posts.push(
        <li key={post.id} className="posts-list__item">
          <Post post={post} />
        </li>
      );
    });

    return <ul className="posts-list">{posts}</ul>;
  }
}
