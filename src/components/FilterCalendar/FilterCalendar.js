import React, { Component } from "react";
import "./FilterCalendar.css";
class FilterCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Date(),
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(e) {
    const date = e.target.value;
    this.props.handleFilterByJoinedDate(date);
    this.setState({
      value: date,
    });
  }
  render() {
    const { value } = this.state;
    const { handleToggleCalendarBar } = this.props;
    return (
      <div className="calendarBar">
        <button onClick={handleToggleCalendarBar} className="filterButton">
          <i className="fas fa-calendar-alt"></i>{" "}
        </button>
        <input
          value={value}
          onChange={this.handleOnChange}
          className="searchInput"
          type="month"
          placeholder={new Date()}
        />
        
        <div className="input-line"></div>
      </div>
    );
  }
}

export default FilterCalendar;
