import React, { Component } from "react";
import TimelineItem from "../TimelineItem/TimelineItem";
import "./TimelineTree.css";
class TimelineTree extends Component {
  state = {
    listItem: [],
  };
  componentDidMount() {
    const listData = this.groupMemberDetailByDate(this.props.listMembers);
    this.setState({ listItem: listData });
  }
  groupMemberDetailByDate(list) {
    const array = [];
    list.forEach((item, i) => {
      let dates = list[i].joinedDate.slice(0, 10);
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
    return groupArrays;
  }
  render() {
    const { listItem } = this.state;
    return (
      <div className="timeline-stream">
        {listItem.map((item, index) => {
          if ((index + 1) % 2 === 0) {
            return (
              <TimelineItem
                isRight={true}
                members={item}
                key={item.members[0].id}
              />
            );
          }
          return (
            <TimelineItem
              isRight={false}
              members={item}
              key={item.members[0].id}
            />
          );
        })}
      </div>
    );
  }
}

export default TimelineTree;
