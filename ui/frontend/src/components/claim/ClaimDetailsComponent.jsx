import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {getClaim} from "../../services/ClaimService";
import {Button, ButtonGroup} from "reactstrap";

function ClaimDetailsComponent() {

    const [claim, setClaim] = useState();

    const {id} = useParams();

    const navigator = useNavigate();

    useEffect(() => {
        getClaim(id).then((response) => {
            setClaim(response.data);
        }).catch(error => {
            console.log(error);
        })
    });

    return (
        <div>
            <h1 className="text-center">Claim Details</h1>
            <br />

            <table className="table table-striped">
                <thead>
                <tr>
                    <td> Claim Id</td>
                    <td> Claim Date</td>
                    <td> Claim Status</td>
                    <td> Claim Item</td>
                    <td> Claim Recipient</td>
                    <td> Actions </td>
                </tr>
                </thead>
                <tbody>
                {claim ? (
                    <tr>
                        <td> {claim.claim_id}</td>
                        <td> {claim.claimDate}</td>
                        <td> {claim.status}</td>
                        <td> {claim.item.name}</td>
                        <td> {claim.recipient.name}</td>
                        <td>
                            <ButtonGroup>
                                <Button size="sm" color="secondary" className="m-1" onClick={() => navigator(`/claim/update/${claim.claim_id}`)}>Edit</Button>
                                <Button size="sm" color="danger" className="m-1" onClick={() => navigator(`/claim/delete/${claim.claim_id}`)}>Delete</Button>
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

export default ClaimDetailsComponent;