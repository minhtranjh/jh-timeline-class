import React, { Component } from "react";
import MemberList from "../../components/MemberList/MemberList";
import PaginationBar from "../../components/PaginationBar/PaginationBar";
import { MembersContext } from "../../context/MembersContext";
import "./MembersPage.css";
class MembersPage extends Component {
  render() {
    return (
      <div className="members">
        <div className="list-head">
          <h2 className="list-title">Members</h2>
          <p className="member-count">29 Total</p>
        </div>
        <MembersContext.Consumer>
          {({ pagedList, handlePagingListMember, totalPages, currentPage }) => (
            <>
              <MemberList
                handlePagingListMember={handlePagingListMember}
                listMembers={pagedList}
              />
              <PaginationBar
                totalPages={totalPages}
                listMembers={pagedList}
                currentPage={currentPage}
                handlePagingListMember={handlePagingListMember}
              />
            </>
          )}
        </MembersContext.Consumer>
      </div>
    );
  }
}

export default MembersPage;
