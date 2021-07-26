import React, { Component } from "react";
import FilterBar from "../../components/FilterBar/FilterBar";
import FilterCalendar from "../../components/FilterCalendar/FilterCalendar";
import MemberListSlider from "../../components/MemberListSlider/MemberListSlider";
import MemberListTable from "../../components/MemberListTable/MemberListTable";
import PaginationBar from "../../components/PaginationBar/PaginationBar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { MembersContext } from "../../context/MembersContext";
import PositionsProvider, {
  PositionsContext,
} from "../../context/PositionsContext";
import "./MembersPage.css";
class MembersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilterSelectionOpen: false,
      isSearchBarOpen: false,
      isFilterBarOpen: false,
      listType: "slider",
      isCalendarBarOpen: false,
    };
    this.handleToggleFilterBar = this.handleToggleFilterBar.bind(this);
    this.handleToggleSearchInput = this.handleToggleSearchInput.bind(this);
    this.toggleFilterSelection = this.toggleFilterSelection.bind(this);
    this.handleToggleCalendarBar = this.handleToggleCalendarBar.bind(this);
    this.handleChangeListType = this.handleChangeListType.bind(this);
  }
  handleToggleFilterBar() {
    if (this.state.isSearchBarOpen) {
      this.toggleSearchInput();
    }
    if (this.state.isCalendarBarOpen) {
      this.toggleCalendarBar();
    }
    this.toggleFilterBar();
  }
  handleToggleSearchInput() {
    if (this.state.isFilterBarOpen) {
      this.toggleFilterBar();
    }
    if (this.state.isCalendarBarOpen) {
      this.toggleCalendarBar();
    }
    this.toggleSearchInput();
  }
  handleToggleCalendarBar() {
    if (this.state.isSearchBarOpen) {
      this.toggleSearchInput();
    }
    if (this.state.isFilterBarOpen) {
      this.toggleFilterBar();
    }
    this.toggleCalendarBar();
  }
  toggleCalendarBar() {
    document.querySelector(".calendarBar").classList.toggle("is-active");
    this.setState({ isCalendarBarOpen: !this.state.isCalendarBarOpen });
  }
  toggleFilterSelection() {
    document.querySelector(".filterSelection").classList.toggle("is-active");
    this.setState({ isFilterSelectionOpen: !this.state.isFilterSelectionOpen });
  }
  toggleFilterBar() {
    const filterBarEl = document.querySelector(".filterBar");
    if (!this.state.isFilterSelectionOpen) {
      filterBarEl.classList.toggle("is-active");
      this.setState({
        isFilterBarOpen: !this.state.isFilterBarOpen,
      });
      return;
    }
    const filterSelectionEl = document.querySelector(".filterSelection");
    filterSelectionEl.classList.remove("is-active");
    let i = setTimeout(() => {
      filterBarEl.classList.toggle("is-active");
      clearTimeout(i);
    }, 500);
    this.setState({
      isFilterBarOpen: !this.state.isFilterBarOpen,
      isFilterSelectionOpen: !this.state.isFilterSelectionOpen,
    });
  }
  toggleSearchInput() {
    document.querySelector(".search-bar").classList.toggle("is-active");
    this.setState({ isSearchBarOpen: !this.state.isSearchBarOpen });
  }
  handleChangeListType(type) {
    this.setState({
      listType: type,
    });
  }
  render() {
    const { listType } = this.state;
    return (
      <MembersContext.Consumer>
        {({
          pagedList,
          isLoading,
          handlePagingListMember,
          totalPages,
          listMembers,
          handleFilterByFeature,
          currentPage,
          handleFindMemberByQuery,
          handleFilterByJoinedDate,
        }) => (
          <div className="members">
            <div className="list-head">
              <div>
                <h2 className="list-title">Members</h2>
                <p className="member-count">{listMembers.length} Total</p>
                <div className="showInBtn">
                  <button
                    className={
                      listType === "slider" ? "listType isActive" : "listType"
                    }
                    onClick={() => this.handleChangeListType("slider")}
                  >
                    <i className="far fa-clone"></i>
                  </button>
                  <button
                    className={
                      listType === "table" ? "listType isActive" : "listType"
                    }
                    onClick={() => this.handleChangeListType("table")}
                  >
                    <i className="fas fa-table"></i>
                  </button>
                </div>
              </div>
              {listType === "table" && (
                <div className="filterOption">
                  <FilterCalendar
                  func={this.func}
                    handleFilterByJoinedDate={handleFilterByJoinedDate}
                    handleToggleCalendarBar={this.handleToggleCalendarBar}
                  />
                  <PositionsProvider>
                    <PositionsContext.Consumer>
                      {({ listPositions, isLoading }) => (
                        <FilterBar
                          isLoading={isLoading}
                          listPositions={listPositions}
                          isFilterSelectionOpen={
                            this.state.isFilterSelectionOpen
                          }
                          handleFilterByFeature={handleFilterByFeature}
                          handleToggleFilterBar={this.handleToggleFilterBar}
                          toggleFilterSelection={this.toggleFilterSelection}
                        />
                      )}
                    </PositionsContext.Consumer>
                  </PositionsProvider>
                  <SearchBar
                    handleToggleSearchInput={this.handleToggleSearchInput}
                    handleFindMemberByQuery={handleFindMemberByQuery}
                  />
                </div>
              )}
            </div>
            {listType === "slider" ? (
              <MemberListSlider
                totalPages={totalPages}
                isLoading={isLoading}
                listMembers={listMembers}
              />
            ) : (
              <>
                <MemberListTable
                  isLoading={isLoading}
                  listMembers={pagedList}
                />
                <PaginationBar
                  isLoading={isLoading}
                  totalPages={10}
                  listMembers={pagedList}
                  currentPage={currentPage}
                  handlePagingListMember={handlePagingListMember}
                />
              </>
            )}
          </div>
        )}
      </MembersContext.Consumer>
    );
  }
}

export default MembersPage;
