import React, { Component } from "react";
import AnimatedLoadingIcon from "../AnimatedLoadingIcon/AnimatedLoadingIcon";
import TimelineItem from "../TimelineItem/TimelineItem";
import "./TimelineTree.css";
class TimelineTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: [],
    };
    this.handleGetListMember = this.handleGetListMember.bind(this);
    this.handleAnimateScrolledElement =
      this.handleAnimateScrolledElement.bind(this);
  }
  componentDidMount() {
    this.handleGetListMember();
    window.addEventListener("scroll", this.handleAnimateScrolledElement);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.handleGetListMember();
      this.handleAnimateScrolledElement();
    }
  }
  handleAnimateScrolledElement() {
    const timelineElement = document.querySelectorAll(".timeline-item");
    timelineElement.forEach((el) => {
      if (this.isElementInView(el, 100)) {
        this.displayElementOnScroll(el);
      } else {
        this.hideElementOnScroll(el);
      }
    });
  }
  displayElementOnScroll(el) {
    el.classList.add("scrolled");
  }
  hideElementOnScroll(el) {
    el.classList.remove("scrolled");
  }
  isElementInView(el, scrollOffset = 0) {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= window.innerHeight - scrollOffset;
  }
  async handleGetListMember() {
    const { listMembers } = this.props;
    if (listMembers.length === 0) return;
    const listData = await this.groupMemberDetailByDate(listMembers);
    this.setState({ listItem: listData });
  }
  async groupMemberDetailByDate(list) {
    const array = [];
    list.forEach((item, i) => {
      let dates = list[i].joinedDate.slice(4);
      if (!array[dates]) {
        array[dates] = [];
      }
      array[dates].push(list[i]);
    });
    const groupArrays = Object.keys(array).map((date) => {
      return {
        joinedDate: date,
        members: array[date],
      };
    });
    const result = groupArrays.sort((a, b) => {
      return new Date(a.joinedDate) - new Date(b.joinedDate);
    });
    return result;
  }

  render() {
    const { listItem } = this.state;
    const { isLoading } = this.props;
    return (
      <div className={!isLoading ? "timelineTree visible" : "timelineTree"}>
        <div className="timeline-stream">
          {listItem.map((item, index) => {
            if ((index + 1) % 2 === 0) {
              return (
                <TimelineItem
                  index={index}
                  isRight={true}
                  members={item}
                  key={item.members[0].id}
                />
              );
            }
            return (
              <TimelineItem
                index={index}
                isRight={false}
                members={item}
                key={item.members[0].id}
              />
            );
          })}
        </div>
        <AnimatedLoadingIcon color="" />
      </div>
    );
  }
}
export default TimelineTree;
