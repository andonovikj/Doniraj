import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getItem} from "../services/ItemService";
import {Button, ButtonGroup} from "reactstrap";
import * as ClaimService from "../services/ClaimService";

function ItemDetailsView() {

    const [item, setItem] = useState();
    const user_id = localStorage.getItem("user_id");

    const {id} = useParams();


    const navigator = useNavigate();

    useEffect(() => {
        getItem(id).then((response) => {
            setItem(response.data);
        }). catch(error => {
            console.log(error);
        })
    })

    const handleClaim = async () => {
        const claimDto = {
            //recipient_id: user_id,
            claimDate: '',
            status: 'CREATED',
            item_id: Number(id),
            recipient_id: Number(4)
        };

        ClaimService.createClaim(claimDto).then((response) => {
               console.log(response.data);
               alert("Item claimed successfully!");
               navigator('/items')
            //fetchAvailableItems(); // Refresh items after claiming
        }).catch (error => {
            console.error("ClaimDTO: " , claimDto);
            console.error("Error claiming item:", error);
            alert(error.response?.data?.message || "Failed to claim item.");
        })
    };

    return (
        <div>
            <h1 className="text-center">Item Details</h1>
            <br />

            <table className="table table-striped">
                <thead>
                <tr>
                    <td> Item Name</td>
                    <td> Item Description</td>
                    <td> Item City</td>
                    <td> Item Donor</td>
                </tr>
                </thead>
                <tbody>
                {item ? (
                    <tr>
                        <td> {item.name}</td>
                        <td> {item.description}</td>
                        <td> {item.city.name}</td>
                        <td> {item.donor.name}</td>
                        <td>
                            <ButtonGroup>
                                <Button size="sm" color="primary" className="m-1" onClick={() => handleClaim()}>Claim</Button>
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

export default ItemDetailsView;