import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Container from "../../components/Container/Container";
import "./NotFoundPage.css"
class NotFoundPage extends Component {
  render() {
    return (
      <Container>
        <div className="notFoundPage">
          <h1>404 Page not found</h1>
          <NavLink to="/">Home</NavLink>
        </div>
      </Container>
    );
  }
}

export default NotFoundPage;
