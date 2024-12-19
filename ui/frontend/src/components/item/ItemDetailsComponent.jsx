import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getItem} from "../../services/ItemService";
import {Button, ButtonGroup} from "reactstrap";

function ItemDetailsComponent() {
    
    const [item, setItem] = useState();
    
    const {id} = useParams();
    
    const navigator = useNavigate();
    
    useEffect(() => {
        getItem(id).then((response) => {
            setItem(response.data);
        }). catch(error => {
            console.log(error);
        })
    })
    
    
    return (
        <div>
            <h1 className="text-center">Item Details</h1>
            <br />

            <table className="table table-striped">
                <thead>
                <tr>
                    <td> Item Id</td>
                    <td> Item Name</td>
                    <td> Item Description</td>
                    <td> Item Status</td>
                    <td> Item City</td>
                    <td> Item Donor</td>
                    <td> Actions </td>
                </tr>
                </thead>
                <tbody>
                {item ? (
                    <tr>
                        <td> {item.item_id}</td>
                        <td> {item.name}</td>
                        <td> {item.description}</td>
                        <td> {item.status}</td>
                        <td> {item.city.name}</td>
                        <td> {item.donor.name}</td>
                        <td>
                            <ButtonGroup>
                                <Button size="sm" color="secondary" className="m-1" onClick={() => navigator(`/item/update/${item.item_id}`)}>Edit</Button>
                                <Button size="sm" color="danger" className="m-1" onClick={() => navigator(`/item/delete/${item.item_id}`)}>Delete</Button>
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

export default ItemDetailsComponent;