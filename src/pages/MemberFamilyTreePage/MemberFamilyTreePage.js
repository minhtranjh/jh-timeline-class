import React, { Component } from "react";
import Container from "../../components/Container/Container";
import MemberFamilyTree from "../../components/MemberFamilyTree/MemberFamilyTree";
import "./MemberFamilyTreePage.css";
class MemberFamilyTreePage extends Component {
  render() {
    return (
      <Container>
        <div className="familyTreePage">
          <div className="familyTreeTitle">
            <h1>Our organization</h1>
          </div>
          <div className="familyTree">
            <MemberFamilyTree />
          </div>
        </div>
      </Container>
    );
  }
}

export default MemberFamilyTreePage;
