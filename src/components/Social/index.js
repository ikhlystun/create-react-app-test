import React, { Component } from "react";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton
} from "react-share";

import "./style.css";

export default class Social extends Component {
  render() {
    const { url, post } = this.props;
    return (
      <div className="social">
        <FacebookShareButton className="social__btn" url={url}>
          Facebook
        </FacebookShareButton>
        <TwitterShareButton
          className="social__btn"
          url={url}
          title={post.title}
        >
          Twitter
        </TwitterShareButton>
        <PinterestShareButton
          className="social__btn"
          url={url}
          media={post.img}
          description={post.title}
        >
          Pinterest
        </PinterestShareButton>
      </div>
    );
  }
}
