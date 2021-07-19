import React, { Component } from "react";

class MemberDetailInfoBox extends Component {
  render() {
    const { memberDetails } = this.props;
    return (
      <div className="detail-box">
        <div className="detail-section">
          <div className="detail-head">
            <h3 className="detail-name">{memberDetails.name}</h3>
            <div className="detail-address">
              <i className="fas fa-map-marker-alt"></i>
              <span>New York, NY</span>
            </div>
          </div>
          <p className="detail-position">{memberDetails.position}</p>
        </div>
        <div className="detail-section">
          <p className="detail-rank-title">Ranking</p>
          <span className="detail-rank">
            {" "}
            <i className="far fa-gem"></i> Platium
          </span>
        </div>
        <div className="detail-section detail-btn">
          <div className="contact-box">
            <i className="fas fa-check"></i>
            <button className="contact-btn">Contact</button>
          </div>
          <button className="report-btn">Report</button>
        </div>
        <div className="member-bar">
          <div className="nav-toolbar">
            <div className="about-bar bar is-active">
              <i className="fas fa-user"></i>
              <h3>About</h3>
            </div>
            <div className="history-bar bar">
              <i className="fas fa-eye"></i>
              <h3>History</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MemberDetailInfoBox;
