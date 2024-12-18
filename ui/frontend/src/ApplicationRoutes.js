import {BrowserRouter, Route, Routes} from "react-router-dom";
import CityListComponent from "./components/city/CityListComponent";
import CityComponent from "./components/city/CityComponent";
import CityDetailsComponent from "./components/city/CityDetailsComponent";
import React from "react";
import UserListComponent from "./components/user/UserListComponent";
import UserDetailsComponent from "./components/user/UserDetailsComponent";
import UserComponent from "./components/user/UserComponent";

const ApplicationRouting = () => {
return (
    <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={ <CityListComponent /> } >
            </Route>
            {/* ---------------------- CITY ROUTES ---------------------- */}
            <Route
                path="/cities"
                element={ <CityListComponent /> } >
            </Route>

            <Route
                path="/city/:id"
                element={ <CityDetailsComponent/> } >
            </Route>

            <Route
                path="/city/add"
                element={ <CityComponent /> } >
            </Route>

            <Route
                path="/city/update/:id"
                element={ <CityComponent /> } >
            </Route>

            {/* ---------------------- USER ROUTES ---------------------- */}

            <Route
                path="/users"
                element={<UserListComponent/> }>
            </Route>

            <Route
                path="/user/:id"
                element={<UserDetailsComponent/> }>
            </Route>

            <Route
                path="/user/add"
                element={<UserComponent/> }>
            </Route>

            <Route
                path="/user/update/:id"
                element={<UserComponent/> }>
            </Route>

        </Routes>

    </BrowserRouter>
)
}
export default ApplicationRouting;