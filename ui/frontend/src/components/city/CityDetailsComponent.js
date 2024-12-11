import React from "react";
import {getCity} from "../../services/CityService";
import {Button, ButtonGroup} from "reactstrap";

const CityDetailsComponent = () =>  {


    return (
            <div>
                <h1 className = "text-center"> City Details</h1>
                <br/>


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
                { /*
                <tr>
                            <td> {city.id}</td>
                            <td> {city.name}</td>
                            <td> {city.zipcode}</td>
                            <td>
                                <ButtonGroup>
                                    <Button size="sm" color="primary" to={"/api/city/" + city.city_id}>View</Button>
                                    <Button size="sm" color="secondary"  to={"/api/city/update/" + city.city_id}>Edit</Button>
                                    <Button size="sm" color="danger" onClick={() => this.remove(city.city_id)}>Delete</Button>
                                </ButtonGroup>
                            </td>
                </tr>
                */}
            }
            </tbody>
        </table>
            </div>
        )

}

export default CityDetailsComponent