import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {createUser} from "../services/AuthService";
import {getCities} from "../services/CityService";
import {Alert, Box, Checkbox, FormControlLabel, Link, TextField, Typography} from "@mui/material";
import {Button, Container} from "reactstrap";

function RegisterComponent() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
        phone_number: null,
        city_id: null
    });
    const [cities, setCities] = useState([]);
    const [error, setError] = useState("");
    const navigator = useNavigate();
    const [termsAccepted, setTermsAccepted] = useState(false);

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

        if (!termsAccepted) {
            setError("You must accept the Terms and Conditions to register.");
            return;
        }

        const { name, email, password, phone_number, city_id, role } = user;

        createUser(user).then((response) => {
            console.log("User registered successfully:", response.data);
            navigator('/login');
        }).catch(error => {
            console.error("Error registering user:", error.response?.data || error);
            setError(error.response?.data?.message || "Registration failed.");
        })
    };

    const handleCheckboxChange = (e) => {
        setTermsAccepted(e.target.checked);
    };

    return (
        <Box sx={{ maxWidth: 500, mx: "auto", mt: 8, p: 4, borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Register
            </Typography>
            <form onSubmit={handleRegister}>
                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="phone_number"
                    value={user.phone_number}
                    onChange={handleChange}
                    required
                />
                <TextField
                    //label="City"
                    select
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="city_id"
                    value={user.city_id || ""}
                    onChange={handleChange}
                    SelectProps={{
                        native: true,
                    }}
                    required
                >
                    <option value="">-- Select a City --</option>
                    {cities.map((city) => (
                        <option key={city.city_id} value={city.city_id}>
                            {city.name}
                        </option>
                    ))}
                </TextField>
                <Typography variant="subtitle1" gutterBottom>
                    I am here to:
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="ROLE_DONOR"
                            checked={user.role === "ROLE_DONOR"}
                            onChange={handleChange}
                            required
                        />
                        Donate
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="ROLE_RECIPIENT"
                            checked={user.role === "ROLE_RECIPIENT"}
                            onChange={handleChange}
                        />
                        Receive
                    </label>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={termsAccepted}
                                onChange={handleCheckboxChange}
                                name="termsAccepted"
                                color="primary"
                            />
                        }
                        label={
                            <Typography variant="body2">
                                I have read and accept the{" "}
                                <Link href="/terms-and-conditions" target="_blank" rel="noopener">
                                    Terms and Conditions
                                </Link>.
                            </Typography>
                        }
                    />

                </Box>
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    Register
                </Button>
            </form>
        </Box>
    );

}

export default RegisterComponent;