import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {deleteClaim, getClaims} from "../../services/ClaimService";
import {Button, ButtonGroup, Container} from "reactstrap";
import {jwtDecode} from "jwt-decode";

function ClaimListComponent() {

    const [claims, setClaims] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllClaims();
    }, []);

    function getAllClaims() {
        getClaims().then((response) => {
            setClaims(response.data);
        }).catch (error => {
            console.log(error);
        })
    }

    function addNewClaim(){
        navigator('/claim/add');
    }

    function viewClaim(id){
        navigator(`/claim/${id}`);
    }

    function editClaim(id){
        navigator(`/claim/update/${id}`);
    }

    function removeClaim(id){
        deleteClaim(id).then((response) => {
            getAllClaims();
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div>
            <h1 className = "text-center">Claims List</h1>
            <br/>

            <Container fluid>
                <div className="float-right">
                    <Button color="success" onClick={addNewClaim}>Add Claim</Button>
                </div>
            </Container>
            <table className = "table table-striped">
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
                {
                    claims.map(
                        claim =>
                            <tr key = {claim.id}>
                                <td> {claim.claim_id}</td>
                                <td> {claim.claimDate}</td>
                                <td> {claim.status}</td>
                                <td> {claim.item.name}</td>
                                <td> {claim.recipient.name}</td>
                                <td>
                                        <ButtonGroup>
                                            <Button size="sm" color="primary" className="m-1" onClick={() => viewClaim(claim.claim_id)}>View</Button>
                                            <Button size="sm" color="secondary" className="m-1" onClick={() => editClaim(claim.claim_id)} >Edit</Button>
                                            <Button size="sm" color="danger" className="m-1" onClick={() => removeClaim(claim.claim_id)}>Delete</Button>
                                        </ButtonGroup>
                                </td>
                            </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

export default ClaimListComponent;