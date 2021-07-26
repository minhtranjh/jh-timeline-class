import React, { Component } from "react";
import firebase from "../firebase/firebaseConfig";

export const MembersContext = React.createContext();
class MembersProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMembers: [],
      totalPages: 0,
      pagedList: [],
      currentPage: 1,
      isLoading: false,
      isSpecificMemberLoading: false,
      unsubscribe: null,
    };
    this.handlePagingListMember = this.handlePagingListMember.bind(this);
    this.findMemberById = this.findMemberById.bind(this);
    this.handleFindMemberByQuery = this.handleFindMemberByQuery.bind(this);
    this.handleFilterByFeature = this.handleFilterByFeature.bind(this);
    this.handleFilterByJoinedDate = this.handleFilterByJoinedDate.bind(this);
    this.firestore = firebase.firestore();
    this.membersTbRef = this.firestore.collection("members_tb");
    this.positionTbRef = this.firestore.collection("positions_tb");
    this.teamTbRef = this.firestore.collection("teams_tb");
  }
  componentDidMount() {
    this.fetchMemberListFromFirebase();
  }
  componentWillUnmount() {
    this.state.unsubscribe();
  }
  handleSetListMemberToState(list) {
    const pagedList = list.slice(0, 5);
    this.setState({
      listMembers: list,
      totalPages: Math.floor(list.length / 5) + 1,
      pagedList,
      isLoading: false,
    });
  }

  fetchMemberListFromFirebase() {
    this.setState({ isLoading: true });
    const unsubscribe = this.membersTbRef
      .orderBy("joinedDate")
      .onSnapshot((snap) => {
        const listMembers = [];
        let index = 0;
        snap.forEach(async (member) => {
          let leaderOf;
          let managedBy;
          const getPositionSnap = await this.positionTbRef
            .doc(member.data().position)
            .get();
          const getTeamByIdSnap = await this.teamTbRef
            .doc(member.data().teamId)
            .get();
          const getTeamByLeaderIdSnap = await this.teamTbRef
            .where("leaderId", "==", member.id)
            .get();
            getTeamByLeaderIdSnap.forEach((doc) => {
            leaderOf = doc.data();
          });
          if (getTeamByIdSnap.exists) {
            managedBy = await this.membersTbRef
              .doc(getTeamByIdSnap.data().leaderId)
              .get();
          }
          const formattedJoinedDate = member
            .data()
            .joinedDate.toDate()
            .toDateString();
          listMembers.push({
            ...member.data(),
            id: member.id,
            team: getTeamByIdSnap.exists
              ? getTeamByIdSnap.data().name
              : undefined,
            name: member.data().firstName + " " + member.data().lastName,
            leaderOf: leaderOf ? leaderOf.name : undefined,
            managedBy: managedBy
              ? {
                  name:
                    managedBy.data().firstName +
                    " " +
                    managedBy.data().lastName,
                  id: managedBy.id,
                }
              : undefined,
            joinedDate: formattedJoinedDate,
            position: getPositionSnap.data().name,
          });
          index++;
          if (this.isDoneLoopingSnapshot(index, snap.size)) {
            this.handleSetListMemberToState(listMembers);
          }
        });
      });
    this.setState({ unsubscribe });
  }
  isDoneLoopingSnapshot(index, size) {
    return index === size;
  }
  handlePagingListMember(page) {
    const { listMembers } = this.state;
    const pagedList = listMembers.slice((page - 1) * 5, 5 * page);
    this.setState({ currentPage: page, pagedList });
  }
  handleFindMemberByQuery(keyword) {
    const listFiltered = [];
    this.state.listMembers.forEach((item) => {
      const name =
        item.firstName.trim().toLowerCase() +
        " " +
        item.lastName.trim().toLowerCase();
      const email = item.email.trim().toLowerCase();
      const query = keyword.trim().toLowerCase();
      if (name.includes(query) || email.includes(query)) {
        listFiltered.push(item);
      }
    });
    this.setState({
      pagedList: listFiltered,
    });
  }
  handleFilterByJoinedDate(date) {
    if (!date) {
      this.handlePagingListMember(1);
      return;
    }
    const { listMembers } = this.state;
    const listFiltered = [];
    listMembers.forEach((item) => {
      const joinedMonth = new Date(item.joinedDate).getMonth() + 1;
      const joinedYear = new Date(item.joinedDate).getFullYear();
      const month = new Date(date).getMonth() + 1;
      const year = new Date(date).getFullYear();
      if (joinedMonth === month && joinedYear === year) {
        listFiltered.push(item);
      }
    });
    this.setState({
      pagedList: listFiltered,
    });
  }
  handleFilterByFeature(featName, feat) {
    if (!featName) {
      this.handlePagingListMember(1);
      return;
    }
    const { listMembers } = this.state;
    const listFiltered = [];
    listMembers.forEach((item) => {
      if (item[featName].toLowerCase() === feat) {
        listFiltered.push(item);
      }
    });
    this.setState({
      pagedList: listFiltered,
      currentPage: 1,
    });
  }
  getMemberFromListMember(id) {
    const { listMembers } = this.state;
    const memberDetails = listMembers.find((item) => item.id === id);
    return memberDetails;
  }
  async findMemberById(id) {
    this.setState({ isSpecificMemberLoading: true });
    const { listMembers } = this.state;
    let memberDetails;
    if (listMembers.length === 0) {
      memberDetails = await this.fetchMemberFromFirebaseById(id);
    } else {
      memberDetails = this.getMemberFromListMember(id);
    }
    this.setState({ isSpecificMemberLoading: false });
    return memberDetails;
  }
  async fetchMemberFromFirebaseById(id) {
    const member = await this.membersTbRef.doc(id).get();
    const position = await this.positionTbRef.doc(member.data().position).get();
    const memberDetail = {
      ...member.data(),
      joinedDate: member.data().joinedDate.toDate().toDateString(),
      position: position.data().name,
    };
    return memberDetail;
  }
  render() {
    const {
      totalPages,
      isSpecificMemberLoading,
      isLoading,
      currentPage,
      listMembers,
      pagedList,
    } = this.state;
    return (
      <MembersContext.Provider
        value={{
          totalPages,
          currentPage,
          isSpecificMemberLoading,
          listMembers,
          isLoading,
          pagedList,
          handleFilterByJoinedDate: this.handleFilterByJoinedDate,
          handleFilterByFeature: this.handleFilterByFeature,
          handleFindMemberByQuery: this.handleFindMemberByQuery,
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
