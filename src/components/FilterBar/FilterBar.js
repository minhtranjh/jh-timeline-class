import React, { Component } from "react";
import "./FilterBar.css";
class FilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFieldOpen: false,
      filterName: "Filter",
      filters: [
        {
          name: "Position",
          fields: [],
        },
      ],
      currentFilterIndex: 0,
    };
    this.handleShowListFilterFields =
      this.handleShowListFilterFields.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleFiltering = this.handleFiltering.bind(this);
    this.removeCurrentFilter = this.removeCurrentFilter.bind(this);
    this.setFieldsToFilter = this.setFieldsToFilter.bind(this);
  }
  componentDidMount() {
    this.setFieldsToFilter();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.setFieldsToFilter();
    }
  }
  setFieldsToFilter() {
    if (this.props.listPositions.length === 0) return;
    const newList = [...this.state.filters];
    newList[0].fields = [...this.props.listPositions];
    this.setState({ filters: newList });
  }
  handleShowListFilterFields(index) {
    document.querySelector(".filterWrapper").classList.add("is-active");
    this.setState({ currentFilterIndex: index, isFieldOpen: true });
  }
  handleGoBack() {
    document.querySelector(".filterWrapper").classList.remove("is-active");
    this.setState({ isFieldOpen: false });
  }
  handleFiltering(featName, feat) {
    document.querySelector(".filterSelectionTitle").classList.add("is-active");
    this.props.handleFilterByFeature(
      featName.toLowerCase(),
      feat.toLowerCase()
    );
    this.setState({ filterName: feat });
  }
  removeCurrentFilter(e) {
    e.stopPropagation();
    document
      .querySelector(".filterSelectionTitle")
      .classList.remove("is-active");
    this.props.handleFilterByFeature();
    this.props.handleToggleFilterBar();
    this.setState({ filterName: "Filter" });
  }
  render() {
    const {
      handleToggleFilterBar,
      isFilterSelectionOpen,
      toggleFilterSelection,
    } = this.props;
    const { filterName, filters, currentFilterIndex, isFieldOpen } = this.state;
    return (
      <div className=" filterChoice filterBar">
        <button onClick={handleToggleFilterBar} className="filterButton">
          <i className="fas fa-filter"></i>
        </button>
        <div onClick={toggleFilterSelection} className="filterSelectionTitle">
          <span className="filterName">{filterName}</span>
          <i
            onClick={this.removeCurrentFilter}
            className={
              isFilterSelectionOpen ? "fas fa-plus is-active" : "fas fa-plus"
            }
          ></i>
        </div>
        <div className="filterSelection">
          <div className="filterWrapper">
            <div className="filterBox">
              {filters.map((item, index) => (
                <div
                  key={item.name}
                  onClick={() => this.handleShowListFilterFields(index)}
                  className="filter"
                >
                  <span>{item.name}</span>{" "}
                  <i className="fas fa-chevron-right"></i>
                </div>
              ))}
            </div>
            <div className="fieldBox">
              {filters[currentFilterIndex].fields.map((item) => (
                <div
                  onClick={() =>
                    this.handleFiltering(
                      filters[currentFilterIndex].name,
                      item.name
                    )
                  }
                  key={item.name}
                  className="filter"
                >
                  <span>{item.name}</span>{" "}
                </div>
              ))}
            </div>
          </div>
          {isFieldOpen && (
            <button onClick={this.handleGoBack} className="goBackBtn">
              <i className="fas fa-chevron-left"></i>
              <span>Go Back</span>
            </button>
          )}
        </div>
        <div className="input-line"></div>
      </div>
    );
  }
}

export default FilterBar;
