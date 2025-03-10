import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, ButtonGroup, Container} from "reactstrap";
import {deleteUser, getAllUsers, getUsers} from "../../services/UserService";
import {jwtDecode} from "jwt-decode";

const UserListComponent = () => {

    const [users, setUsers] = useState([]);

    const [userRole, setUserRole] = useState(null);

    const navigator = useNavigate();

    // useEffect(() => {
    //     getAllUsers();
    // }, [])

    useEffect(() => {
        const token = localStorage.getItem("token"); // Get JWT token from storage
        if (!token) {
            //navigator("/"); // Redirect if no token
            //return;
        }

        try {
            const decoded = jwtDecode(token); // Decode JWT
            if (!decoded.role.includes("ADMIN")) {
                //navigator("/"); // Redirect if not admin
            } else {
                setUserRole(decoded.role); // Store role in state
                getAllUsers();
            }
        } catch (error) {
            console.error("Invalid token:", error);
        }
    }, [navigator]);

    function getAllUsers() {
        getUsers().then((response) => {
            setUsers(response.data);
            console.log("users:" , response.data)
        }).catch(error => {
            console.log(error);
        })
    }

    function addNewUser() {
        navigator('/admin/user/add');
    }

    function viewUser(id) {
        navigator(`admin/user/${id}`)
    }

    function editUser(id) {
        navigator(`/admin/update/${id}`);
    }

    function removeUser(id) {
        deleteUser(id).then((response) => {
            getAllUsers();
        })
    }

    if (userRole !== "ADMIN") {
        return <h2>Access Denied</h2>; // Prevent rendering if not an admin
    }

    return (
        <div>
            <h1 className = "text-center">Users List</h1>
            <br/>

            <Container fluid>
                <div className="float-right">
                    <Button color="success" onClick={addNewUser}>Add User</Button>
                </div>
            </Container>
            <table className = "table table-striped">
                <thead>
                <tr>
                    <td> User Id</td>
                    <td> User Name</td>
                    <td> User Email</td>
                    <td> User Phone Number</td>
                    <td> User Role</td>
                    <td> User City</td>
                    <td> Actions </td>
                </tr>

                </thead>
                <tbody>
                {
                    users.map(
                        user =>
                            <tr key = {user.id}>
                                <td> {user.user_id}</td>
                                <td> {user.name}</td>
                                <td> {user.email}</td>
                                <td> {user.phone_number}</td>
                                <td> {user.role}</td>
                                <td> {user.city.name}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button size="sm" color="primary" className="m-1" onClick={() => viewUser(user.user_id)}>View</Button>
                                        <Button size="sm" color="secondary" className="m-1" onClick={() => editUser(user.user_id)} >Edit</Button>
                                        <Button size="sm" color="danger" className="m-1" onClick={() => removeUser(user.user_id)}>Delete</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                    )
                }
                </tbody>
            </table>

        </div>
    );
};

export default UserListComponent;