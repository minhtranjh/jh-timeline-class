import React, { Component } from "react";
import { MembersContext } from "../../context/MembersContext";
import MemberListItem from "../MemberListItem/MemberListItem";
import "./MemberList.css";
class MemberList extends Component {
  render() {
    const { listMembers } = this.props;
    return (
      <div className="list-wrapper">
        <table className="list-members">
        <thead>
          <tr>
            <th>No.</th>
            <th>Basic Info</th>
            <th>Position</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listMembers.map((item,index) => (
            <MemberListItem index={index} memberDetail={item} key={item.id} />
          ))}
        </tbody>
      </table>
      </div>
    );
  }
}
export default MemberList;
