import React, { Component } from "react";
import firebase from "../firebase/firebaseConfig";

export const PositionsContext = React.createContext();
class PositionsProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPositions: [],
      isLoading : false,
    };
    this.fetchListPositionsFromFirebase =
      this.fetchListPositionsFromFirebase.bind(this);
  }
  componentDidMount() {
    this.fetchListPositionsFromFirebase();
  }
  fetchListPositionsFromFirebase() {
    this.setState({isLoading : true})
    const firestore = firebase.firestore();
    const positionRef = firestore.collection("/positions_tb");
    positionRef.onSnapshot((snap) => {
      const list = [];
      snap.forEach((doc) => {
        list.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      this.setState({ listPositions: list, isLoading : false});
    });
  }
  render() {
    const { listPositions ,isLoading} = this.state;
    return (
      <PositionsContext.Provider
        value={{
          listPositions,
          isLoading
        }}
      >
        {this.props.children}
      </PositionsContext.Provider>
    );
  }
}

export default PositionsProvider;
