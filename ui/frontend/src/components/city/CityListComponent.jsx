import React, {Component, useEffect, useState} from 'react';
import {Button, ButtonGroup, Container} from "reactstrap";
import {getCities} from "../../services/CityService";

const CityListComponent = () => {

    /* class component
 The constructor () is invoked before the component is mounted
    constructor(props){
        super(props) // one-way data bind
        this.state = { // add cities to the state of the component (make them available) to display them
            cities:[] // state variable
        }
        this.remove = this.remove.bind(this); // delete
    }
    // Use componentDidMount to fetch data after the component mounts
    async componentDidMount(){
        CityService.getCities().then((response) => {
            this.setState({ cities: response.data}) // Update state with the fetched data
        });
    }

    async remove(id) {
        if (!id) {
            console.error("Invalid ID for deletion:", id);
            return;
        }
        await CityService.deleteCity(id)
            .then(response => {
                console.log("City deleted successfully:", response.data);
            })
            .catch(error => {
                console.error("Error deleting city:", error.response);
            });

        let updatedCities = [...this.state.cities].filter(i => i.id !== id);
        this.setState({cities: updatedCities});

    }
     */

    const [cities, setCities] = useState([]);

    useEffect(() => {
        getCities().then((response) => {
            setCities(response.data);
        }).catch(error => {
            console.log(error)
        })

    }, []) // Empty dependency array ([]) to ensure the data fetch runs only once when the component is mounted

        return (
            <div>
                <h1 className = "text-center">Cities List</h1>
            <br/>

                <Container fluid>
                    <div className="float-right">
                        <Button color="success" to="/api/city/add">Add City</Button>
                    </div>
                </Container>
                <table className = "table table-striped">
                    <thead>
                    <tr>

                        <td> City Id</td>
                        <td> City Name</td>
                        <td> City Zipcode</td>
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
                                                <Button size="sm" color="primary" >View</Button>
                                                <Button size="sm" color="secondary" >Edit</Button>
                                                <Button size="sm" color="danger" >Delete</Button>
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