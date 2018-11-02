import React, { Component } from "react";
import { Link } from "react-router-dom";

import Page from "../Page";
import Social from "../Social";

import "./style.css";

export default class Share extends Component {
  render() {
    const url = window.location.href.replace("/share", "/modal");
    const modalId = this.props.match.match.params.id;
    const post = this.props.post.find(x => x.id === modalId);

    return (
      <Page
        id="share-modal"
        title={post.title}
        description={post.description}
        image={post.img}
      >
        <div className="share-modal">
          <div className="share-modal__inner">
            <h2 className="share-modal__title">Share</h2>
            <div className="share-modal__body">
              <Social post={post} url={url} />
              <input className="share-modal__field" value={url} readOnly />
            </div>
            <Link className="share-modal__close" to="/">
              X
            </Link>
          </div>
        </div>
      </Page>
    );
  }
}
