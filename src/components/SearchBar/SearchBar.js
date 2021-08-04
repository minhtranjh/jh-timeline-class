import React, { Component } from "react";
import "./SearchBar.css";
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(e) {
    this.props.handleFindMemberByQuery(e.target.value);
    this.setState({ value: e.target.value });
  }

  render() {
    const { handleToggleSearchInput } = this.props;
    return (
      <div className="filterChoice search-bar">
        <button onClick={handleToggleSearchInput} className="filterButton">
          <i className="fas fa-search"></i>
        </button>
        <input
          className="searchInput"
          value={this.state.value}
          onChange={this.handleOnChange}
          placeholder="Search ..."
        />
        <div className="input-line"></div>
      </div>
    );
  }
}

export default SearchBar;
