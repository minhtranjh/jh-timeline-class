import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import AnimatedLoadingIcon from "../AnimatedLoadingIcon/AnimatedLoadingIcon";
import "./MemberListSlider.css";
class MemberListSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translateX: 0,
      totalSlide: 0,
      currentSlideIndex: 0,
    };
    this.handleNextSlide = this.handleNextSlide.bind(this);
    this.handlePrevSlide = this.handlePrevSlide.bind(this);
    this.handleSetTotalSlideOnResize =
      this.handleSetTotalSlideOnResize.bind(this);
    this.sliderRef = React.createRef();
  }
  handleNextSlide() {
    if (this.state.currentSlideIndex + 1 === this.state.totalSlide) return;

    const sliderWidth = this.sliderRef.current.clientWidth;
    this.setState({
      translateX: this.state.translateX - sliderWidth,
      currentSlideIndex: this.state.currentSlideIndex + 1,
    });
  }
  handlePrevSlide() {
    if (this.state.currentSlideIndex === 0) return;
    const sliderWidth = this.sliderRef.current.clientWidth;
    this.setState({
      translateX: this.state.translateX + sliderWidth,
      currentSlideIndex: this.state.currentSlideIndex - 1,
    });
  }

  handleSetTotalSlideOnResize() {
    if (window.innerWidth <= 768) {
      this.setState({
        totalSlide: this.props.listMembers.length,
        translateX: 0,
        currentSlideIndex: 0,
      });
      return;
    }
    this.setState({
      totalSlide: this.props.totalPages,
      translateX: 0,
      currentSlideIndex: 0,
    });
  }
  componentDidMount() {
    this.handleSetTotalSlideOnResize();
    window.addEventListener("resize", this.handleSetTotalSlideOnResize);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.handleSetTotalSlideOnResize();
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleSetTotalSlideOnResize);
  }
  render() {
    const { translateX, totalSlide, currentSlideIndex } = this.state;
    const { listMembers, isLoading } = this.props;
    return (
      <>
        {!isLoading ? (
          <div

            className="sliderWrapper"
          >
            <div
              className="slider"
              ref={this.sliderRef}
              style={{ transform: `translateX(${translateX}px)` }}
            >
              {listMembers.map((item, index) => (
                <NavLink
                  to={`/member/${item.id}`}
                  key={item.id}
                  className="slide"
                >
                  <img className="slideImg" src={item.picture} alt="" />
                  <div className="slideDetails">
                    <p className="slideName">
                      {item.firstName}
                      <i className="far fa-eye"></i>
                    </p>
                    <p className="slideBirth">
                      {item.dateOfBirth.toDate().toDateString()}
                    </p>
                    <p className="slidePosition">{item.position}</p>
                  </div>
                </NavLink>
              ))}
            </div>
            <div className="sliderButtons">
              <div onClick={this.handlePrevSlide} className="sliderPrevBtn">
                <i className="fas fa-chevron-left"></i>
              </div>
              <div onClick={this.handleNextSlide} className="sliderNextBtn">
                <i className="fas fa-chevron-right"></i>
              </div>
              <div className="sliderNumber">
                {currentSlideIndex + 1}
                <div></div>
                {totalSlide}
              </div>
            </div>
          </div>
        ) : (
          <AnimatedLoadingIcon color="" />
        )}
      </>
    );
  }
}

export default MemberListSlider;
