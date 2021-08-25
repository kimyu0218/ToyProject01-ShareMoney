import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import DetailPage from './components/views/DetailPage/DetailPage'
import LandingPage from "./components/views/LandingPage/LandingPage"
import GeneratePage from "./components/views/GeneratePage/GeneratePage"
import JoinPage from "./components/views/JoinPage/JoinPage"
import EditPage from "./components/views/EditPage/EditPage"
import NavBar from "./components/views/NavBar/NavBar"
import Footer from "./components/views/Footer/Footer"
import Auth from './hoc/auth'

function App() {
  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, true)} />
          <Route exact path="/join" component={Auth(JoinPage, true)} />
          <Route exact path="/edit" component={Auth(EditPage, true)} />
          <Route exact path="/detail" component={Auth(DetailPage, true)} />
          <Route exact path="/generate" component={Auth(GeneratePage, true)} />
          <Route exact path="/login" component = {Auth(LoginPage, false)} />
          <Route exact path="/register" component = {Auth(RegisterPage, false)} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;