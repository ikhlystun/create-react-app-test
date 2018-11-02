import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";

import Modal from "../Modal";
import PostsList from "../PostsList";
import Share from "../Share";
import Filter from "../Filter";
import Page from "../Page";

import posts from "../../fixtures";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterValue: ""
    };

    this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
  }

  handleFilterValueChange(filterValue) {
    this.setState({
      filterValue: filterValue
    });
  }

  render() {
    return (
      <Page>
        <Filter
          filterValue={this.state.filterValue}
          onFilterValueChange={this.handleFilterValueChange}
          post={posts}
        />
        <Fragment>
          <Route
            path="/"
            render={() => (
              <PostsList filterValue={this.state.filterValue} post={posts} />
            )}
          />
          <Route
            path="/share/:id"
            render={match => <Share post={posts} match={match} />}
          />
          <Route
            path="/modal/:id"
            render={match => <Modal post={posts} match={match} />}
          />
        </Fragment>
      </Page>
    );
  }
}
