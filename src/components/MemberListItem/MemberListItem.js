import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { MembersContext } from "../../context/MembersContext";
import "./MemberListItem.css";
import MemberAvatar from '../MemberAvatar/MemberAvatar'
class MemberListItem extends Component {
  render() {
    const { memberDetail, index } = this.props;
    return (
      <MembersContext.Consumer>
        {({ currentPage }) => (
          <tr>
            <td>{5 * (currentPage - 1) + (index + 1)}</td>
            <td>
              <div className="basic-info">
              <div className="small-avatar">
                  <MemberAvatar picture={memberDetail.picture} name={memberDetail.name}/>
                </div>                <div className="info">
                  <p className="name">{memberDetail.name}</p>
                  <p className="email">{memberDetail.email}</p>
                </div>
              </div>
            </td>
            <td>
              <p className="position">{memberDetail.position}</p>
            </td>
            <td>
              <NavLink
                className="member-link"
                to={{
                  pathname: `/member/${memberDetail.id}`,
                }}
              >
                Details
              </NavLink>
            </td>
          </tr>
        )}
      </MembersContext.Consumer>
    );
  }
}

export default MemberListItem;
