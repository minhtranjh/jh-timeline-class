import React, { Component } from "react";
import MemberDetail from "../../components/MemberDetail/MemberDetail";
import { MembersContext } from "../../context/MembersContext";
import "./MemberDetailsPage.css";
class MemberDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.handleGoBack = this.handleGoBack.bind(this);
  }
  handleGoBack(e) {
    this.props.history.goBack();
  }
  render() {
    console.log(this.props.history);
    return (
      <>
        <div className="backBtnWrapper">
          <div className="backBtn" onClick={this.handleGoBack}>
            <button>Back</button>
          </div>
        </div>

        <MembersContext.Consumer>
          {({ findMemberById, isSpecificMemberLoading }) => (
            <MemberDetail
              isSpecificMemberLoading={isSpecificMemberLoading}
              id={this.props.match.params.id}
              findMemberById={findMemberById}
            />
          )}
        </MembersContext.Consumer>
      </>
    );
  }
}
export default MemberDetailsPage;
