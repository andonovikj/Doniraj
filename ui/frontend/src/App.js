import './App.css';
import React, { Component } from "react";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import ApplicationRouting from "./ApplicationRoutes"

class App extends Component {

  render() {

    return (
        <>
            <HeaderComponent />

            <ApplicationRouting />

            <FooterComponent />
        </>
    );
  }
}

export default App;
