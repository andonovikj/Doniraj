import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getUser} from "../services/UserService";
import {Button, ButtonGroup} from "reactstrap";
import { jwtDecode } from "jwt-decode";

function UserDetailsView () {
    const [user, setUser] = useState();

    const { id } = useParams();

    const navigator = useNavigate();

    const token = localStorage.getItem("token"); // or however you store the token
    let currentUserRole = null;
    if (token) {
        const decodedToken = jwtDecode(token);
        console.log("role:" , decodedToken.role);
        currentUserRole = decodedToken.role;  // Assuming your JWT includes a 'role' claim
    }


    useEffect(() => {
        getUser(id).then((response) => {
            setUser(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, [id])
    return (
        <div>
            <h1 className="text-center">User Details</h1>
            <br />

            <table className="table table-striped">
                <thead>
                <tr>
                    <td> User Name</td>
                    <td> User Email</td>
                    <td> User Phone Number</td>
                    {/*{currentUserRole === 'ROLE_ADMIN' && <td> User Role</td>} */}
                    <td> User City</td>
                    <td> Actions </td>
                </tr>
                </thead>
                <tbody>
                {user ? (
                    <tr>
                        <td> {user.name}</td>
                        <td> {user.email}</td>
                        <td> {user.phone_number}</td>
                        {/*currentUserRole === 'ROLE_ADMIN' && <td> {user.role}</td>*/}
                        <td> {user.city.name}</td>
                        <td>
                            <ButtonGroup>
                                <Button size="sm" color="secondary" className="m-1" onClick={() => navigator(`/user/update/${user.user_id}`)}>Edit</Button>
                            </ButtonGroup>

                        </td>
                    </tr>
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">Loading...</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default UserDetailsView;