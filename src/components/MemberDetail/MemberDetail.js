import React, { Component } from "react";
import MemberAvatar from "../MemberAvatar/MemberAvatar";
import MemberDetailInfoBox from "../MemberDetailInfoBox/MemberDetailInfoBox";
import "./MemberDetail.css";
class MemberDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberDetails: {},
    };
  }
  componentDidMount() {
    const { id } = this.props;
    const memberDetails = this.getMemberDetailById(id);
    this.setState({
      memberDetails,
    });
  }
  getMemberDetailById(id) {
    const memberDetails = this.props.findMemberById(id);
    return memberDetails;
  }
  render() {
    const { memberDetails } = this.state;
    return (
      <div className="member-detail-wrapper">
        <div className="member-detail">
          <div className="detail-left">
            <div className="avatar-wrapper">
              <MemberAvatar picture={memberDetails.picture} name={memberDetails.name}/>
            </div>
          </div>
          <div className="detail-right">
            <MemberDetailInfoBox memberDetails={memberDetails} />
          </div>
        </div>
      </div>
    );
  }
}

export default MemberDetail;
