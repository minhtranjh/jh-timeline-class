import React, { Component } from "react";
import AnimatedLoadingIcon from "../AnimatedLoadingIcon/AnimatedLoadingIcon";
import MemberListItem from "../MemberListItem/MemberListItem";
import "./MemberListTable.css";
class MemberListTable extends Component {
  render() {
    const { listMembers, isLoading } = this.props;
    return (
      <div className="list-wrapper">
        <table className="list-members">
          <thead>
            <tr>
              <th>No.</th>
              <th>Basic Info</th>
              <th>Position </th>
              <th>Joined Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {!isLoading ? (
              listMembers.length > 0 ? (
                listMembers.map((item, index) => (
                  <MemberListItem
                    index={index}
                    memberDetail={item}
                    key={item.id}
                  />
                ))
              ) : (
                <tr className="not-found">
                  <td colSpan={5}>
                    <i className="far fa-sad-tear"></i> Empty
                  </td>
                </tr>
              )
            ) : (
              <tr className="not-found">
                <td colSpan={5}>
                  <AnimatedLoadingIcon color="green" />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
export default MemberListTable;
