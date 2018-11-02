import React, { Component } from "react";

import "./style.css";

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleFilterValueChange = this.handleFilterValueChange.bind(this);
  }

  handleFilterValueChange(e) {
    this.props.onFilterValueChange(e.target.value);
  }

  render() {
    const uniqType = {};
    const filteredPosts = this.props.post.filter(
      obj => !uniqType[obj.type] && (uniqType[obj.type] = true)
    );
    const options = filteredPosts.map(post => (
      <option key={post.id} value={post.type}>
        Type: {post.type}
      </option>
    ));

    return (
      <select
        className="select"
        value={this.props.filterValue}
        onChange={this.handleFilterValueChange}
      >
        <option value="">All resources</option>
        {options}
      </select>
    );
  }
}
