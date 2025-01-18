import './App.css';
import React, { Component } from "react";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import ApplicationRouting from "./ApplicationRoutes"
import {BrowserRouter} from "react-router-dom";

class App extends Component {

  render() {

    return (
        <BrowserRouter>
            <HeaderComponent />
            <ApplicationRouting />
            <FooterComponent />
        </BrowserRouter>
    );
  }
}

export default App;
