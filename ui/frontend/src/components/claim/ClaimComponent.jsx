import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {createClaim, getClaim, updateClaim} from "../../services/ClaimService";
import {createItem, getItems, updateItem} from "../../services/ItemService";
import {getUsers} from "../../services/UserService";

function ClaimComponent() {

    const [claimDate, setClaimDate] = useState('');
    const [status, setStatus] = useState('');
    const [item_id, setItem_id] = useState(null);
    const [recipient_id, setRecipient_id] = useState(null);

    const [items, setItems] = useState([]);
    const [recipients, setRecipients] = useState([]);

    const navigator = useNavigate();

    const {id} = useParams();

    useEffect(() => {
        getAllItems()
    }, []);

    function getAllItems(){
        getItems().then((response) => {
            setItems(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect( () => {
        getAllRecipients();

    }, []) // Empty dependency array ([]) to ensure the data fetch runs only once when the component is mounted

    function getAllRecipients(){
        getUsers().then((response) => {
            setRecipients(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    function pageTitle() {
        if (id) {
            return <h4 className='title'>Update Claim</h4>
        } else {
            return <h4 className='title'>Add Claim</h4>
        }
    }

    useEffect(() => {
        if (id) {
            getClaim(id).then((response) => {
                setClaimDate(response.data.claimDate);
                setStatus(response.data.status);
                setItem_id(response.data.item_id);
                setRecipient_id(response.data.recipient_id);
            })
        }
    }, [id]);

    const [errors, setErrors] = useState({
        claimDate: '',
        status: ''
    });

    function saveOrUpdateClaim(e) {
        e.preventDefault(); //

        if (validateForm())
        {
            const claim = {claimDate, status, item_id, recipient_id};
            console.log(claim);

            if (id)
            {
                updateClaim(id, claim).then((response) => {
                    navigator('/claims')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createClaim(claim).then((response) => {
                    console.log(response.data);
                    navigator('/claims');
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
            claimDate: claimDate.trim(),
            status: status.trim()

        };

        Object.keys(fields).forEach((field) => {
            if (!fields[field]) {
                errorsCopy[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
                valid = false;
            } else {
                errorsCopy[field] = '';
            }
        });

        if (item_id === null || item_id === undefined || isNaN(item_id)) {
            errorsCopy.user_id = "Item id is required.";
            valid = false;
        }

        if (recipient_id === null || recipient_id === undefined || isNaN(recipient_id)) {
            errorsCopy.city = "Recipient (User) is required.";
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
                                <label className="form-label">Claim Name:</label>
                                <input
                                    type="date"
                                    placeholder="Enter Claim date"
                                    name="claimDate"
                                    value={claimDate}
                                    className={`form-control ${ errors.claimDate ? 'is-invalid' : ''} `}
                                    onChange={(e) => setClaimDate(e.target.value)}
                                >
                                </input>
                                { errors.claimDate && <div className="invalid-feedback">{ errors.claimDate }</div> }
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Status:</label>
                                <select
                                    name="status"
                                    value={status}
                                    className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="CREATED">Created</option>
                                    <option value="CANCELLED">Cancelled</option>
                                    <option value="FINISHED">Finished</option>
                                </select>
                                {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Item:</label>
                                <select
                                    value={item_id || ''}
                                    onChange={(e) => setItem_id(Number(e.target.value))}
                                    className={`form-control ${errors.item_id ? 'is-invalid' : ''}`}
                                >
                                    <option value="">-- Select Item --</option>
                                    {items.map(itemOption => (
                                        <option key={itemOption.item_id} value={itemOption.item_id}>
                                            {itemOption.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Recipient:</label>
                                <select
                                    value={recipient_id || ''} // Bind the value to the current city
                                    onChange={(e) => setRecipient_id(Number(e.target.value))} // Update the city state on change
                                    className={`form-control ${errors.recipient_id ? 'is-invalid' : ''}`} // Optional error handling
                                >
                                    <option value="">-- Select Recipient --</option>
                                    {recipients.map(recipientOption => (
                                        <option key={recipientOption.user_id} value={recipientOption.user_id}>
                                            {recipientOption.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateClaim}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClaimComponent;