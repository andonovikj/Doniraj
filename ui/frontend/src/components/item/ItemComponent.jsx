import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {createUser, getUser, getUsers, updateUser} from "../../services/UserService";
import {getCities} from "../../services/CityService";
import {createItem, getItem, updateItem} from "../../services/ItemService";

function ItemComponent() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');
    const [city_id, setCity_id] = useState(null);
    const [user_id, setUser_id] = useState(null);
    const [cities, setCities] = useState([]);
    const [users, setUsers] = useState([]);

    const navigator = useNavigate();

    const { id } = useParams();

    function pageTitle() {
        if (id) {
            return <h4 className='title'>Update Item</h4>
        } else {
            return <h4 className='title'>Add Item</h4>
        }
    }

    useEffect( () => {
        getAllCities();

    }, []) // Empty dependency array ([]) to ensure the data fetch runs only once when the component is mounted

    function getAllCities(){
        getCities().then((response) => {
            setCities(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect( () => {
        getAllUsers();

    }, []) // Empty dependency array ([]) to ensure the data fetch runs only once when the component is mounted

    function getAllUsers(){
        getUsers().then((response) => {
            setUsers(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        if (id) {
            getItem(id).then((response) => {
                setName(response.data.name);
                setDescription(response.data.description);
                setStatus(response.data.status);
                setCity_id(response.data.city_id);
                setUser_id(response.data.user_id);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id])

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        status: ''
    })

    function saveOrUpdateItem(e) {
        e.preventDefault(); //

        if (validateForm())
        {
            const item = {name, description, status, city_id, user_id};
            console.log(item);

            if (id)
            {
                updateItem(id, item).then((response) => {
                    navigator('/items')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createItem(item).then((response) => {
                    console.log(response.data);
                    navigator('/items');
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }

    const validateForm = () => {
        let valid = true;
        let errorsCopy = {};

        const fields = {
            name: name.trim(),
            description: description.trim(),
            status: status.trim()
        };

        Object.keys(fields).forEach((field) => {
            if (!fields[field]) {
                errorsCopy[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
                valid = false;
            } else {
                errorsCopy[field] = '';
            }
        });

        if (user_id === null || user_id === undefined || isNaN(user_id)) {
            errorsCopy.user_id = "Donor (User) id is required.";
            valid = false;
        }

        if (city_id === null || city_id === undefined || isNaN(city_id)) {
            errorsCopy.city = "City is required.";
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    };

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="card col-md-6 offset-md-3">
                    {
                        pageTitle()
                    }
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">Item Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Item name"
                                    name="name"
                                    value={name}
                                    className={`form-control ${ errors.name ? 'is-invalid' : ''} `}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </input>
                                { errors.name && <div className="invalid-feedback">{ errors.name }</div> }
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Item Description:</label>
                                <input
                                    type="text"
                                    placeholder="Enter Item Description"
                                    name="description"
                                    value={description}
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Status:</label>
                                <select
                                    name="status"
                                    value={status}
                                    className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="AVAILABLE">Available</option>
                                    <option value="CLAIMED">Claimed</option>
                                </select>
                                {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">City:</label>
                                <select
                                    value={city_id || ''} // Bind the value to the current city
                                    onChange={(e) => setCity_id(Number(e.target.value))} // Update the city state on change
                                    className={`form-control ${errors.city ? 'is-invalid' : ''}`} // Optional error handling
                                >
                                    <option value="">-- Select City --</option>
                                    {cities.map(cityOption => (
                                        <option key={cityOption.city_id} value={cityOption.city_id}>
                                            {cityOption.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Donor:</label>
                                <select
                                    value={user_id || ''} // Bind the value to the current city
                                    onChange={(e) => setUser_id(Number(e.target.value))} // Update the city state on change
                                    className={`form-control ${errors.user_id ? 'is-invalid' : ''}`} // Optional error handling
                                >
                                    <option value="">-- Select User --</option>
                                    {users.map(userOption => (
                                        <option key={userOption.user_id} value={userOption.user_id}>
                                            {userOption.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateItem}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemComponent;