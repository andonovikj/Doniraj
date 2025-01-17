import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getUser} from "../services/UserService";
import {Button, ButtonGroup} from "reactstrap";

function UserDetailsView () {
    const [user, setUser] = useState();

    const { id } = useParams();

    const navigator = useNavigate();

    useEffect(() => {
        getUser(id).then((response) => {
            setUser(response.data);
        }).catch(error => {
            console.log(error);
        })
    })
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