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
import LoginComponent from "./components/LoginComponent";
import ItemDetailsView from "./views/ItemDetailsView";
import UserDetailsView from "./views/UserDetailsView";
import AboutUsComponent from "./components/static/AboutUsComponent";
import ContactComponent from "./components/static/ContactComponent";
import FaqComponent from "./components/static/FaqComponent";

const ApplicationRouting = () => {
return (

        <Routes>
            <Route
                path="/"
                element={ <AvailableItems /> } >
            </Route>
            {/* ---------------------- CITY ROUTES ---------------------- */}
            <Route
                path="/admin/cities"
                element={ <CityListComponent /> } >
            </Route>

            <Route
                path="/admin/city/:id"
                element={ <CityDetailsComponent/> } >
            </Route>

            <Route
                path="/admin/city/add"
                element={ <CityComponent /> } >
            </Route>

            <Route
                path="/admin/city/update/:id"
                element={ <CityComponent /> } >
            </Route>

            {/* ---------------------- USER ROUTES ---------------------- */}

            <Route
                path="/admin/users"
                element={<UserListComponent/> }>
            </Route>

            <Route
                path="/admin/user/:id"
                element={<UserDetailsComponent/> }>
            </Route>

            <Route
                path="/admin/user/add"
                element={<UserComponent/> }>
            </Route>

            <Route
                path="/admin/user/update/:id"
                element={<UserComponent/> }>
            </Route>

            <Route
                path="/profile"
                element={<UserDetailsView/> }>
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
                path="/admin/item/update/:id"
                element={<ItemComponent/> }>
            </Route>

            <Route
                path="item/add"
                element={<ItemComponent/> }>
            </Route>

            <Route
                path="/admin/item/:id"
                element={<ItemDetailsComponent/> }>
            </Route>

            <Route
                path="/item/:id"
                element={<ItemDetailsView/> }>
            </Route>

            {/* ---------------------- CLAIM ROUTES ---------------------- */}

            <Route
                path="/admin/claims"
                element={ <ClaimListComponent/> }
            ></Route>

            <Route
                path="/admin/claim/update/:id"
                element={<ClaimComponent/> }>
            </Route>

            <Route
                path="/admin/claim/add"
                element={<ClaimComponent/> }>
            </Route>

            <Route
                path="/admin/claim/:id"
                element={<ClaimDetailsComponent/> }>
            </Route>

            {/* ---------------------- AUTH ROUTES ---------------------- */}

            <Route
                path="/register"
                element={<RegisterComponent/> }>
            </Route>

            <Route
                path="/login"
                element={<LoginComponent/> }>
            </Route>

            {/* ---------------------- STATIC ROUTES ---------------------- */}

            <Route
                path="/about"
                element={<AboutUsComponent/> }>
            </Route>

            <Route
                path="/contact"
                element={<ContactComponent/> }>
            </Route>

            <Route
                path="/faq"
                element={<FaqComponent/> }>
            </Route>

        </Routes>


)
}
export default ApplicationRouting;