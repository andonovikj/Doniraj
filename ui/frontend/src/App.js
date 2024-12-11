import './App.css';
import { Component } from "react";
import CityListComponent from "./components/city/CityListComponent";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CityDetailsComponent from "./components/city/CityDetailsComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

class App extends Component {


  render() {

    return (
        <>
            <BrowserRouter>

                <HeaderComponent />
                    <Routes>
                        <Route
                            path="/"
                            element={ <CityListComponent /> }>
                        </Route>

                        <Route
                            path="/cities"
                            element={ <CityListComponent /> }>
                        </Route>

                    </Routes>


                    {/*<CityDetailsComponent />*/}

                <FooterComponent />

            </BrowserRouter>
        </>
    );
  }
}

export default App;
