import React, { Component } from "react";
import MemberDetail from "../../components/MemberDetail/MemberDetail";
import { MembersContext } from "../../context/MembersContext";

class MemberDetailsPage extends Component {
  render() {
    return (
      <MembersContext.Consumer>
        {({ findMemberById }) => (
          <MemberDetail
            id={this.props.match.params.id}
            findMemberById={findMemberById}
          />
        )}
      </MembersContext.Consumer>
    );
  }
}
export default MemberDetailsPage;
