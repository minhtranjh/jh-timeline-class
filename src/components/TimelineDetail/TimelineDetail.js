import React, { Component } from "react";
import RollingDownMemberList from "../RollingDownMemberList/RollingDownMemberList";
import "./TimelineDetail.css";
class TimelineDetail extends Component {
  render() {
    const { isRight, members } = this.props;
    return (
      <div className={isRight ? "timeline-card left" : "timeline-card right"}>
        <div className="card-title">
          <p>
            {" "}
            {members.length > 1
              ? `${members.length} Members `
              : members[0].firstName + " "}
            has joined
          </p>
          <span>Lorem ipsum dolor sit, ameptatum blanditiis?</span>
          <div className="listImage">
            {members.map((item) => (
              <img className="detailImage" src={item.picture} alt="" />
            ))}
          </div>
        </div>
        <RollingDownMemberList members={members} />
      </div>
    );
  }
}

export default TimelineDetail;
