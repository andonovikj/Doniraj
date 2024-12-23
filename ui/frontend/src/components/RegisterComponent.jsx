import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {createUser} from "../services/UserService";
import {getCities} from "../services/CityService";

function RegisterComponent() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        phone_number: null,
        city_id: null
    });
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [phone_number, setPhone_number] = useState(null);
    // const [city_id, setCity_id] = useState(null);
    // const [password, setPassword] = useState('');
    const [cities, setCities] = useState([]);
    const [error, setError] = useState("");
    const navigator = useNavigate();

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const { name, email, password, phone_number, city_id, role } = user;

        createUser(user).then((response) => {
            console.log("User registered successfully:", response.data);
            navigator('/login');
        }).catch(error => {
            console.error("Error registering user:", error.response?.data || error);
            setError(error.response?.data?.message || "Registration failed.");
        })
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Register</h2>
            <form className="mt-4" >
                <div className="form-group mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="phone_number"
                        value={user.phone_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>City</label>
                    <select
                        className="form-control"
                        name="city_id"
                        value={user.city_id}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select a City --</option>
                        {cities.map((city) => (
                            <option key={city.city_id} value={city.city_id}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label>I am here to:</label>
                    <div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="role"
                                value="ROLE_DONOR"
                                checked={user.role === "ROLE_DONOR"} // Set default selection
                                onChange={handleChange}
                                required
                            />
                            <label className="form-check-label">Donate</label>
                        </div>
                        <div className="form-check">
                            <input
                                type="radio"
                                className="form-check-input"
                                name="role"
                                value="ROLE_RECIPIENT"
                                checked={user.role === "ROLE_RECIPIENT"}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">Receive</label>
                        </div>
                    </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                <button type="submit" onClick={handleRegister} className="btn btn-primary w-100">
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegisterComponent;