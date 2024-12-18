import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getCities} from "../../services/CityService";
import {createUser, getUser, updateUser} from "../../services/UserService";

const UserComponent = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone_number] = useState(null);
    const [role, setRole] = useState('');
    const [city_id, setCity_id] = useState(null);
    const [password, setPassword] = useState('');
    const [cities, setCities] = useState([]);

    const navigator = useNavigate();

    const { id } = useParams(); // get id from url

    function pageTitle() {
        if (id) {
            return <h4 className='title'>Update User</h4>
        } else {
            return <h4 className='title'>Add User</h4>
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

    useEffect(() => {
        if (id) {
            getUser(id).then((response) => {
                setName(response.data.name);
                setEmail(response.data.email);
                setPhone_number(response.data.phone_number);
                setRole(response.data.role);
                setCity_id(response.data.city_id);
                setPassword(response.data.password);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id])

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        //phone_number: '',
        role: '',
        //city_id: '',
        password: ''
    })

    function saveOrUpdateUser(e) {
        e.preventDefault(); //

        if (validateForm())
        {
            const user = {name, email, password, phone_number, role, city_id};
            console.log(user);

            if (id)
            {
                updateUser(id, user).then((response) => {
                    console.log("hello from saveorUpdateUser() if validateFOrm(), if (id)", response.data);
                    navigator('/users')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createUser(user).then((response) => {
                    console.log(response.data);
                    navigator('/users');
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
            email: email.trim(),
            //phone_number: phone_number.trim(),
            role: role.trim(),
            //city_id: city_id.trim(),
            password: password.trim()
        };

        Object.keys(fields).forEach((field) => {
            if (!fields[field]) {
                errorsCopy[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
                valid = false;
            } else {
                errorsCopy[field] = '';
            }
        });

        if (phone_number === null || phone_number === undefined || isNaN(phone_number)) {
            errorsCopy.phone_number = "Phone Number is required.";
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
                                <label className="form-label">User Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter User name"
                                    name="name"
                                    value={name}
                                    className={`form-control ${ errors.name ? 'is-invalid' : ''} `}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </input>
                                { errors.name && <div className="invalid-feedback">{ errors.name }</div> }
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">User Email:</label>
                                <input
                                    type="text"
                                    placeholder="Enter User email"
                                    name="email"
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Phone Number:</label>
                                <input
                                    type="number"
                                    placeholder="Enter Phone Number"
                                    name="phone_number"
                                    value={phone_number}
                                    className={`form-control ${errors.phone_number ? 'is-invalid' : ''}`}
                                    onChange={(e) => setPhone_number(Number(e.target.value))}
                                />
                                {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Role:</label>
                                <select
                                    name="role"
                                    value={role}
                                    className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Select Role</option>
                                    <option value="ROLE_ADMIN">Admin</option>
                                    <option value="ROLE_DONOR">Donor</option>
                                    <option value=" ROLE_RECIPIENT">Recipient</option>
                                </select>
                                {errors.role && <div className="invalid-feedback">{errors.role}</div>}
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
                                <label className="form-label">Password:</label>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    value={password}
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateUser}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserComponent;