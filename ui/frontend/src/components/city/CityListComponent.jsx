import React, {Component, useEffect, useState} from 'react';
import {Button, ButtonGroup, Container} from "reactstrap";
import {deleteCity, getCities, getCity} from "../../services/CityService";
import { useNavigate } from "react-router-dom";

const CityListComponent = () => {

    const [cities, setCities] = useState([]);

    const [newCityId, setNewCityId] = useState([]);

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
        console.log("hello from edit city in citylist component")
        navigator(`/city/update/${id}`);
    }

    function removeCity(id, newCityId) {
        console.log("removed city");
        deleteCity(id, newCityId).then((response) => {
            getAllCities();
        }).catch(error => {
            console.log(error);
        })
    }

    // TODO: consistency with async await
        return (
            <div>
                <h1 className = "text-center">Cities List</h1>
            <br/>

                <Container fluid>
                    <div className="float-right">
                        <Button color="success" onClick={addNewCity}>Add City</Button>
                    </div>
                </Container>
                <table className = "table table-striped">
                    <thead>
                    <tr>

                        <td> City Id</td>
                        <td> City Name</td>
                        <td> City Zipcode</td>
                        <td> Actions </td>
                    </tr>

                    </thead>
                    <tbody>
                    {
                            cities.map(
                                city =>
                                    <tr key = {city.id}>
                                        <td> {city.city_id}</td>
                                        <td> {city.name}</td>
                                        <td> {city.zipcode}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size="sm" color="primary" className="m-1" onClick={() => viewCity(city.city_id)}>View</Button>
                                                <Button size="sm" color="secondary" className="m-1" onClick={() => editCity(city.city_id)} >Edit</Button>
                                                <div>
                                                    <label>Select new city for items:</label>
                                                    <select onChange={(e) => setNewCityId(e.target.value)}>
                                                        <option value="">-- Select City --</option>
                                                        {cities.map(city => (
                                                            <option key={city.city_id} value={city.city_id}>{city.name}</option>
                                                        ))}
                                                    </select>
                                                    <Button size="sm" color="danger" className="m-1" onClick={() => removeCity(city.city_id, newCityId)}>Delete</Button>
                                                </div>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                            )
                    }
                    </tbody>
                </table>

            </div>

        )

}
export default CityListComponent