import React, {useEffect, useState} from "react";
import {getCity} from "../../services/CityService";
import {Button, ButtonGroup} from "reactstrap";
import {useNavigate, useParams} from "react-router-dom";

const CityDetailsComponent = () =>  {

    const [ city, setCity] = useState();
    const { id } = useParams();
    const navigator = useNavigate();

    useEffect( () => {
        getCity(id).then((response) => {
            setCity(response.data);
        }).catch(error => {
            console.log(error);
        }, [id])
        }

    )


    return (
        <div>
            <h1 className="text-center">City Details</h1>
            <br />

            <table className="table table-striped">
                <thead>
                <tr>
                    <td>City Id</td>
                    <td>City Name</td>
                    <td>City Zipcode</td>
                </tr>
                </thead>
                <tbody>
                {city ? (
                    <tr>
                        <td>{city.city_id}</td>
                        <td>{city.name}</td>
                        <td>{city.zipcode}</td>
                        <td>

                            <ButtonGroup>
                                <Button size="sm" color="secondary" onClick={() => navigator(`/city/update/${city.city_id}`)}>Edit</Button>
                                {/* TODO: delete button make api call through service*/}
                                <Button size="sm" color="danger" onClick={() => navigator(`/city/delete/${city.city_id}`)}>Delete</Button>
                            </ButtonGroup>

                        </td>
                    </tr>
                ) : (
                    <tr>
                        <td colSpan="4" className="text-center">Loading...</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );


}

export default CityDetailsComponent