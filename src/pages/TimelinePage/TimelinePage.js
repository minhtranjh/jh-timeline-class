import React, { Component } from "react";
import Container from "../../components/Container/Container";
import TimelineTree from "../../components/TimelineTree/TimelineTree";
import { MembersContext } from "../../context/MembersContext";
import "./TimelinePage.css";
class TimelinePage extends Component {
  render() {
    return (
      <Container>
        <div className="timelinePage">
        <div className="timeline">
          <div className="timeline-title">
            <p>A Story Of</p>
            <h1>Journey Horizon</h1>
          </div>
          <MembersContext.Consumer>
            {({listMembers,isLoading}) => <TimelineTree  isLoading={isLoading} listMembers={listMembers} />}
          </MembersContext.Consumer>
        </div>
      </div>
      </Container>
    );
  }
}

export default TimelinePage;
