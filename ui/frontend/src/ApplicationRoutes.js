import {BrowserRouter, Route, Routes} from "react-router-dom";
import CityListComponent from "./components/city/CityListComponent";
import CityComponent from "./components/city/CityComponent";
import CityDetailsComponent from "./components/city/CityDetailsComponent";
import React from "react";
import UserListComponent from "./components/user/UserListComponent";
import UserDetailsComponent from "./components/user/UserDetailsComponent";
import UserComponent from "./components/user/UserComponent";
import ItemListComponent from "./components/item/ItemListComponent";
import ItemComponent from "./components/item/ItemComponent";
import ItemDetailsComponent from "./components/item/ItemDetailsComponent";
import ClaimListComponent from "./components/claim/ClaimListComponent";
import ClaimComponent from "./components/claim/ClaimComponent";
import ClaimDetailsComponent from "./components/claim/ClaimDetailsComponent";
import AvailableItems from "./views/AvailableItems";
import RegisterComponent from "./components/RegisterComponent";

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

            {/* ---------------------- ITEM ROUTES ---------------------- */}

            <Route
                path="/admin/items"
                element={ <ItemListComponent/> }
            ></Route>

            <Route
                path="/items"
                element={ <AvailableItems/> }
            ></Route>

            <Route
                path="/item/update/:id"
                element={<ItemComponent/> }>
            </Route>

            <Route
                path="/item/add"
                element={<ItemComponent/> }>
            </Route>

            <Route
                path="/item/:id"
                element={<ItemDetailsComponent/> }>
            </Route>

            {/* ---------------------- CLAIM ROUTES ---------------------- */}

            <Route
                path="/claims"
                element={ <ClaimListComponent/> }
            ></Route>

            <Route
                path="/claim/update/:id"
                element={<ClaimComponent/> }>
            </Route>

            <Route
                path="/claim/add"
                element={<ClaimComponent/> }>
            </Route>

            <Route
                path="/claim/:id"
                element={<ClaimDetailsComponent/> }>
            </Route>

            <Route
                path="/register"
                element={<RegisterComponent/> }>
            </Route>

        </Routes>

    </BrowserRouter>
)
}
export default ApplicationRouting;