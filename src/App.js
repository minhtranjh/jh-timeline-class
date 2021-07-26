import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import AnimatedLoadingIcon from "./components/AnimatedLoadingIcon/AnimatedLoadingIcon";
import Layout from "./components/Layout/Layout";
import MembersProvider from "./context/MembersContext";

class App extends Component {
  render() {
    const MembersPage = lazy(() => import("./pages/MembersPage/MembersPage"));
    const TimelinePage = lazy(() =>
      import("./pages/TimelinePage/TimelinePage")
    );
    const MemberDetailsPage = lazy(() =>
      import("./pages/MemberDetailsPage/MemberDetailsPage")
    );
    const MemberFamilyTreePage = lazy(() =>
      import("./pages/MemberFamilyTreePage/MemberFamilyTreePage")
    );

    return (
      <Router>
        <Layout>
          <MembersProvider>
            <Suspense fallback={<AnimatedLoadingIcon/>}>
              <Switch>
                <Route
                  name="timeline"
                  exact
                  path="/"
                  render={(props) => <TimelinePage {...props} />}
                ></Route>
                <Route
                  name="members"
                  path="/members"
                  render={(props) => <MembersPage {...props} />}
                />
                <Route
                  name="timeline"
                  exact
                  path="/tree"
                  render={(props) => <MemberFamilyTreePage {...props} />}
                ></Route>
                <Route
                  name="memberDetails"
                  path="/member/:id"
                  render={(props) => <MemberDetailsPage {...props} />}
                />
              </Switch>
            </Suspense>
          </MembersProvider>
        </Layout>
      </Router>
    );
  }
}

export default App;
