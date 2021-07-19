import React, { Component } from "react";
import data from "../data/data";
export const MembersContext = React.createContext();
class MembersProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMembers: [],
      totalPages: 0,
      pagedList: [],
      currentPage: 1,
    };
    this.handlePagingListMember = this.handlePagingListMember.bind(this);
    this.findMemberById = this.findMemberById.bind(this);
  }
  componentDidMount() {
    this.fetchListMember();
  }
  fetchListMember() {
    const newData = data.sort((a, b) => {
      return (new Date(a.joinedDate) - new Date(b.joinedDate));
    });
    const pagedList = newData.slice(0, 5);
    this.setState({
      listMembers: newData,
      totalPages : 10,
      // totalPage: Math.floor(newData.length / 5) + 1,
      pagedList,
    });
  }
  handlePagingListMember(page) {
    const newList = this.state.listMembers;
    const pagedList = newList.slice((page - 1) * 5, 5 * page);
    this.setState({ currentPage: page, pagedList });
  }
  findMemberById(id) {
    let user;
    this.state.listMembers.forEach((item) => {
      if (item.id === id) {
        user = item;
      }
    });
    return user;
  }
  getAllMembers() {
    return this.state.listMembers;
  }
  render() {
    const { totalPages, currentPage, listMembers, pagedList } = this.state;
    return (
      <MembersContext.Provider
        value={{
          totalPages,
          currentPage,
          listMembers,
          pagedList,
          findMemberById: this.findMemberById,
          handlePagingListMember: this.handlePagingListMember,
        }}
      >
        {this.props.children}
      </MembersContext.Provider>
    );
  }
}

export default MembersProvider;
