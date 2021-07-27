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
  async getPositionById(positionId) {
    const getPositionSnap = await this.positionTbRef.doc(positionId).get();
    return getPositionSnap.exists
      ? { ...getPositionSnap.data(), id: getPositionSnap.id }
      : undefined;
  }
  async getTeamById(teamId) {
    const getTeamSnap = await this.teamTbRef.doc(teamId).get();
    return getTeamSnap.exists
      ? { ...getTeamSnap.data(), id: getTeamSnap.id }
      : undefined;
  }
  async getTeamNameByLeaderId(leaderId) {
    let team;
    const getTeamByLeaderIdSnap = await this.teamTbRef
      .where("leaderId", "==", leaderId)
      .get();
    getTeamByLeaderIdSnap.forEach((doc) => {
      team = { ...doc.data(), id: doc.id };
    });
    return team;
  }
  async getManagedByLeaderId(leaderId) {
    const snap = await this.membersTbRef.doc(leaderId).get();
    return snap.exists ? { ...snap.data(), id: snap.id } : undefined;
  }
  fetchMemberListFromFirebase() {
    this.setState({ isLoading: true });
    const unsubscribe = this.membersTbRef
      .orderBy("joinedDate")
      .onSnapshot((snap) => {
        const listMembers = [];
        let index = 0;
        snap.forEach(async (doc) => {
          let managedBy;
          const member = { ...doc.data(), id: doc.id };
          const memberPosition = await this.getPositionById(member.position);
          const team = await this.getTeamById(member.teamId);
          const leaderOfTeam = await this.getTeamNameByLeaderId(member.id);
          if (team) {
            managedBy = await this.getManagedByLeaderId(team.leaderId);
          }
          const formattedJoinedDate = member.joinedDate.toDate().toDateString();
          listMembers.push({
            ...member,
            id: member.id,
            team: team ? team.name : undefined,
            name: member.firstName + " " + member.lastName,
            leaderOf: leaderOfTeam ? leaderOfTeam.name : undefined,
            managedBy: managedBy
              ? {
                  name: managedBy.firstName + " " + managedBy.lastName,
                  id: managedBy.id,
                }
              : undefined,
            joinedDate: formattedJoinedDate,
            position: memberPosition ? memberPosition.name : undefined,
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
    console.log(featName,feat);
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
    const memberSnap = await this.membersTbRef.doc(id).get();
    if (!memberSnap.exists) {
      return;
    }
    const member = memberSnap.data();
    const positionSnap = await this.positionTbRef.doc(member.position).get();
    if (!positionSnap.exists) {
      return;
    }
    const memberDetail = {
      ...member,
      joinedDate: member.joinedDate.toDate().toDateString(),
      position: positionSnap.data().name,
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
    console.log(listMembers);
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
