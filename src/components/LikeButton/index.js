import React, { Component } from "react";

export default class LikeButton extends Component {
  render() {
    const { isLiked, handleClickIsLiked } = this.props;
    const label = isLiked ? "Unlike" : "Like";

    return (
      <button className="btn like-btn" onClick={handleClickIsLiked}>
        {label}
      </button>
    );
  }
}
