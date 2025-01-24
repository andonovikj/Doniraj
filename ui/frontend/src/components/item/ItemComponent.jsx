import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getUsers} from "../../services/UserService";
import {getCities} from "../../services/CityService";
import {createItem, getItem, updateItem} from "../../services/ItemService";
import {
    Box,
    Card,
    CardContent,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Typography,
} from '@mui/material';
import {jwtDecode} from "jwt-decode";

function ItemComponent() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [city_id, setCity_id] = useState(null);
    const [user_id, setUser_id] = useState(null);
    const [cities, setCities] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [role, setRole] = useState(null);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    const navigator = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        if (token){
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.role);
            setLoggedInUserId(decodedToken.user_id);
        }
    }, []);


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
                setCity_id(response.data.city_id);
                setUser_id(response.data.user_id);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [id])

    const [errors, setErrors] = useState({
        name: '',
        description: ''
    })

    function saveOrUpdateItem(e) {
        e.preventDefault(); //

        if (validateForm())
        {
            const item = {name, description, city_id, user_id};

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
            description: description.trim()
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
                {!isLoggedIn && (
                    <Typography
                        variant='h5'
                        component="div"
                        sx={{ justifyContent: 'center' }}
                    >We appreciate your kindness. We kindly ask you to log in to donate an item. </Typography>
                )}
                {isLoggedIn && (
                    <>
                        <Card sx={{ maxWidth: 600, margin: '0 auto', padding: 2, mt: 4 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {pageTitle()}
                                </Typography>
                                <form>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <TextField
                                            label="Item Name"
                                            variant="outlined"
                                            placeholder="Enter Item name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            error={!!errors.name}
                                            helperText={errors.name}
                                            fullWidth
                                        />
                                        <TextField
                                            label="Item Description"
                                            variant="outlined"
                                            placeholder="Enter Item Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            error={!!errors.description}
                                            helperText={errors.description}
                                            fullWidth
                                        />
                                        <FormControl fullWidth variant="outlined" error={!!errors.city}>
                                            <InputLabel>City</InputLabel>
                                            <Select
                                                value={city_id || ''}
                                                onChange={(e) => setCity_id(Number(e.target.value))}
                                                label="City"
                                            >
                                                <MenuItem value="">-- Select City --</MenuItem>
                                                {cities.map((cityOption) => (
                                                    <MenuItem key={cityOption.city_id} value={cityOption.city_id}>
                                                        {cityOption.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl fullWidth variant="outlined" error={!!errors.user_id}>
                                            <InputLabel>Donor</InputLabel>
                                            <Select
                                                value={user_id || ''}
                                                onChange={(e) => setUser_id(Number(e.target.value))}
                                                label="Donor"
                                            >
                                                {role === "ROLE_ADMIN" && (
                                                    <>
                                                        <MenuItem value="">-- Select User --</MenuItem>
                                                        {users.map((userOption) => (
                                                            <MenuItem key={userOption.user_id} value={userOption.user_id}>
                                                                {userOption.name}
                                                            </MenuItem>
                                                        ))}
                                                    </>
                                                )}
                                                {role === "ROLE_DONOR" && (
                                                    <MenuItem key={loggedInUserId} value={loggedInUserId}>
                                                        {users.find((user) => user.user_id === loggedInUserId)?.name || 'Your Name'}
                                                    </MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={saveOrUpdateItem}
                                            fullWidth
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </form>
                            </CardContent>
                        </Card>
                    </>
                )}

            </div>
        </div>
    );
}

export default ItemComponent;