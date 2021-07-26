import React, { Component } from "react";
import MemberFamilyTree from "../../components/MemberFamilyTree/MemberFamilyTree";
import { MembersContext } from "../../context/MembersContext";
import "./MemberFamilyTreePage.css";
class MemberFamilyTreePage extends Component {
  render() {
    return (
      <div className="familyTreePage">
         <div className="familyTreeTitle">
            <h1>Our organization</h1>
          </div>
        <div className="familyTree">
          <MembersContext.Consumer>
            {({ listMembers, isLoading }) => (
              <MemberFamilyTree
                isLoading={isLoading}
                listMembers={listMembers}
              />
            )}
          </MembersContext.Consumer>
        </div>
      </div>
    );
  }
}

export default MemberFamilyTreePage;
