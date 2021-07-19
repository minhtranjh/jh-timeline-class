import React, { Component } from "react";
import TimelineStream from "../../components/TimelineTree/TimelineTree";
import { MembersContext } from "../../context/MembersContext";
import "./TimelinePage.css";
class TimelinePage extends Component {
  render() {
    return (
      <div className="container">
        <div className="timeline">
          <div className="timeline-title">
            <p>A Story Of</p>
            <h1>Journey Horizon</h1>
          </div>
          <MembersContext.Consumer>
            {({listMembers}) => <TimelineStream listMembers={listMembers} />}
          </MembersContext.Consumer>
        </div>
      </div>
    );
  }
}

export default TimelinePage;
