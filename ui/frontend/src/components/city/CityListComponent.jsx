import React, {Component, useEffect, useState} from 'react';
import {deleteCity, getCities, getCity} from "../../services/CityService";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Container,
    Grid,
    IconButton,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const CityListComponent = () => {

    const [cities, setCities] = useState([]);

    const [replacementCities, setReplacementCities] = useState([]);

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

    function viewCity(id){
        console.log("view city ", id);
        navigator(`/city/${id}`)
    }

    function addNewCity(){
        navigator('/city/add');
    }

    function editCity(id) {
        navigator(`/city/update/${id}`);
    }

    function removeCity(id) {
        const newCityId = replacementCities[id]; // Get the replacement city for the specific row
        if (!newCityId) {
            alert("Please select a replacement city before deleting.");
            return;
        }
        // Replacement city for the specific row
        const params = newCityId ? { newCityId } : {};
        deleteCity(id, params).then((response) => {
            console.log("removed city");
            getAllCities();
        }).catch(error => {
            console.log(error);
        })
    }

    const handleReplacementCityChange = (cityId, value) => {
        setReplacementCities((prev) => ({
            ...prev,
            [cityId]: value,
        }));
    };
        return (
            <Container>
                <Typography variant="h4" sx={{ mt: 2 }}align="center" gutterBottom>
                    Cities List
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleIcon />}
                    onClick={addNewCity}
                    sx={{ mb: 2 }}
                >
                    Add City
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>City Id</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>City Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>City Zipcode</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cities.map((city) => (
                                <TableRow key={city.city_id}>
                                    <TableCell>{city.city_id}</TableCell>
                                    <TableCell>{city.name}</TableCell>
                                    <TableCell>{city.zipcode}</TableCell>
                                    <TableCell>
                                        <Grid container spacing={1} alignItems="center">
                                            <Grid item>
                                                <IconButton color="info" onClick={() => viewCity(city.city_id)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                            </Grid>
                                            <Grid item>
                                                <IconButton color="secondary" onClick={() => editCity(city.city_id)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Grid>
                                            <Grid item>
                                                {/* The key is the ID of a city to be deleted,
                                                     and the value is the ID of the replacement city chosen for that row */}
                                                <Select
                                                    value={replacementCities[city.city_id] || ""}
                                                    onChange={(e) =>
                                                        handleReplacementCityChange(city.city_id, e.target.value)
                                                    }
                                                    displayEmpty
                                                    size="small"
                                                >
                                                    <MenuItem value="">
                                                        <em>-- Select Replacement City --</em>
                                                    </MenuItem>
                                                    {cities
                                                        .filter((option) => option.city_id !== city.city_id) // Exclude the current city from the list
                                                        .map((option) => (
                                                        <MenuItem key={option.city_id} value={option.city_id}>
                                                            {option.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </Grid>
                                            <Grid item>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => removeCity(city.city_id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        )

}
export default CityListComponent