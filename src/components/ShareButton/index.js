import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ShareButton extends Component {
  render() {
    const { post } = this.props;

    return (
      <Link
        to={{ pathname: `/share/${post.id}`, state: { modal: true } }}
        className="btn share-btn"
      >
        Share
      </Link>
    );
  }
}
