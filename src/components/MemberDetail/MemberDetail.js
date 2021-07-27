import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AnimatedLoadingIcon from "../AnimatedLoadingIcon/AnimatedLoadingIcon";
import "./MemberDetail.css";
class MemberDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberDetails: {},
      translateX: 0,
    };
    this.getMemberDetailById = this.getMemberDetailById.bind(this);
    this.handleSetMemberDetailToState =
      this.handleSetMemberDetailToState.bind(this);
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
  }
  componentDidMount() {
    this.handleSetMemberDetailToState();
  }
  async handleSetMemberDetailToState() {
    const { id } = this.props;
    const memberDetails = await this.getMemberDetailById(id);
    this.setState({
      memberDetails,
    });
  }
  async getMemberDetailById(id) {
    const memberDetails = await this.props.findMemberById(id);
    return memberDetails;
  }
  nextSlide() {
    const imgWidth = document.querySelector(".pictureWrap").clientWidth;
    this.setState({ translateX: this.state.translateX + imgWidth });
  }
  prevSlide() {
    const imgWidth = document.querySelector(".pictureWrap").clientWidth;
    this.setState({ translateX: this.state.translateX - imgWidth });
  }
  render() {
    const { memberDetails, translateX } = this.state;
    const { isSpecificMemberLoading } = this.props;
    if(!memberDetails){
      return (<Redirect to="/404"/>)
    }
    return (
      <div
        className={
          !isSpecificMemberLoading
            ? "member-detail-wrapper visible"
            : "member-detail-wrapper"
        }
      >
        <div className="member-detail">
          <div className="detail-container">
            <div className="memberDetailHead">
              <p className="memberJoinedYear">
                since {new Date(memberDetails.joinedDate).getFullYear()}
              </p>
              <span className="memberPosition">{memberDetails.position}</span>
            </div>
            <div className="memberDetailName">
              {memberDetails.lastName + " " + memberDetails.firstName}
            </div>
            <div
              className="gallarySlider"
              style={{ transform: `translateX(${translateX}px)` }}
            >
              <div className="pictureWrap">
                <img className="pictureImg" src={memberDetails.picture} />
              </div>
            </div>
            <div className="sliderBottom">
              <div className="sliderNumber">
                1<div></div>2
              </div>
              <div className="sliderButtons">
                <button className="nextSlide">
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button className="nextSlide">
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </div>
            <div className="basicInfo">
              <h2>Basic Information</h2>
              <p>
                Full name :{" "}
                {memberDetails.firstName + " " + memberDetails.lastName}
              </p>
              <p>Position : {memberDetails.position}</p>
              <p>
                Birth :{" "}
                {memberDetails?.joinedDate &&
                  memberDetails?.dateOfBirth.toDate().toDateString().slice(4)}
              </p>
              <p>Address : {memberDetails.address}</p>
              <p>Email : {memberDetails.email}</p>
            </div>
            <button className="contactBtn">
              {" "}
              <i className="fas fa-check"></i>
              <span>Contact</span>
            </button>
            <div className="basicDescription">
              <h2 className="aboutTitle">About</h2>
              <p>
                Known for listing some of the top technology companies in the
                world, Nasdaq added another major player on August 18, 2004.
                Google, then a six-year-old internet search engine, debuted on
                the exchange as one of the most coveted stock offerings in
                history. Google’s IPO took the form of a somewhat unconventional
                Dutch auction, in which all investors paid the same highest
                bidding price instead of trying to outbid each other, as in more
                traditional public offerings led by investment banks. The
                unconventional format was an effort to democratize the
                distribution of stock to all kinds of consumers, in accordance
                with Google’s “Don’t be evil” philosophy. Although news outlets
                were skeptical at the time, the stock opened at $100, $15 higher
                than the initial public offering price. The exchange raised
                Google’s profile significantly, leading more people to use it as
                their preferred search engine.
                <br />{" "}
                <strong>
                  By year’s end, Google’s stock had doubled and Nasdaq
                  considered the listing one of its highest-profile
                  accomplishments. Since then, Google has only gained in
                  popularity and within the public consciousness. In 2006,
                  “google” became an official entry in the Merriam-Webster
                  Collegiate Dictionary, and the company grew to be the top
                  search site by far among users worldwide.
                </strong>{" "}
                Google remains listed on Nasdaq today, though in 2015 it
                transitioned to Alphabet Class A (GOOGL) and Class C (GOOG)
                stock when the search engine launched its new holding company,
                Alphabet Inc. The organization’s shares were strong throughout
                the decade. In fact, stock purchased in 2010 saw more than a 400
                percent return by 2020. "Getting to win the deal, it was really
                full force with Bob [Greifeld], Adena [Friedman] and myself.
                Google was very focused on data: ‘How do you guys trade stocks
                and data and learn from it?’ It wasn’t a pitch meeting, it was
                like ‘OK, let us learn from you guys.’ They turned the whole
                presentation around and started picking our brains." –Bruce
                Aust, Former Vice Chairman and Executive Vice President of
                Global Listings
              </p>
            </div>
          </div>
        </div>
        <AnimatedLoadingIcon color="" />
      </div>
    );
  }
}

export default MemberDetail;
