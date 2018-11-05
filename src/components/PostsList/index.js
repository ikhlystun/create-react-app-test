import React, { Component } from "react";
import Post from "../Post";

import "./style.css";

export default class PostsList extends Component {
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
