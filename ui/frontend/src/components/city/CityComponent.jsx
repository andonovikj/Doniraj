import React, {useEffect, useState} from 'react';
import {create} from "axios";
import {createCity, getCity, updateCity} from "../../services/CityService";
import {useNavigate, useParams} from "react-router-dom";

const CityComponent = () => {

    const [name, setName] = useState('');

    const [zipcode, setZipcode] = useState('');

    const navigator = useNavigate();

    const { id } = useParams(); // get id from url

    function pageTitle() {
        if (id) {
            return <h4 className='title'>Update City</h4>
        } else {
            return <h4 className='title'>Add City</h4>
        }
    }

    useEffect(() => {
        if (id) {

            getCity(id).then((response) => {
                setName(response.data.name);
                setZipcode(response.data.zipcode);
            }).catch(error => {
                console.log(error);
            });

        }
    }, [id])

    const [errors, setErrors] = useState({
        name: '',
        zipcode: ''
    })

    function saveOrUpdateCity(e) {
        e.preventDefault(); //

        if (validateForm())
        {
            const city = {name, zipcode};
            console.log(city);

            if (id)
            {
                updateCity(id, city).then((response) => {
                    console.log("hello from saveorUpdateCity() if validateFOrm(), if (id)", response.data);
                    navigator('/cities')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createCity(city).then((response) => {
                    console.log(response.data);
                    navigator('/cities');
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }

    function validateForm()
    {
        let valid = true;
        const errorsCopy = {... errors};

        if (name.trim()) {
            errorsCopy.name = '';
        } else {
            errorsCopy.name = 'Name is required.';
            valid = false;
        }

       if(zipcode.trim()) {
            errorsCopy.zipcode = '';
        } else {
            errorsCopy.zipcode = 'Zipcode is required.';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

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
                                <label className="form-label">City Name:</label>
                                <input
                                    type="text"
                                    placeholder="Enter City name"
                                    name="name"
                                    value={name}
                                    className={`form-control ${ errors.name ? 'is-invalid' : ''} `}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </input>
                                { errors.name && <div className="invalid-feedback">{ errors.name }</div> }
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">City Zipcode:</label>
                                <input
                                    type="number"
                                    placeholder="Enter City zipcode"
                                    name="zipcode"
                                    value={zipcode}
                                    className={`form-control ${ errors.zipcode ? 'is-invalid' : ''} `}
                                    onChange={(e) => setZipcode(e.target.value)}
                                >
                                </input>
                                { errors.zipcode && <div className="invalid-feedback">{ errors.zipcode }</div> }
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateCity}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CityComponent;