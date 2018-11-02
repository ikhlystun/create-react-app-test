import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import Page from "../Page";

import "./style.css";

export default class Modal extends Component {
  render() {
    const modalId = this.props.match.match.params.id;
    const post = this.props.post.find(x => x.id === modalId);

    return (
      <Page
        id="modal"
        title={post.title}
        description={post.description}
        image={post.img}
      >
        <div className="modal">
          <div className="modal__inner">
            {post ? (
              <Fragment>
                <h2 className="modal__title">{post.title}</h2>
                <div className="modal__body">
                  <img src={post.img} alt={post.title} />
                </div>
              </Fragment>
            ) : (
              <div>Not found</div>
            )}
            <Link className="modal__close" to="/">
              X
            </Link>
          </div>
        </div>
      </Page>
    );
  }
}
