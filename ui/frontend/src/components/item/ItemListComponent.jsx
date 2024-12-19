import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {Button, ButtonGroup, Container} from "reactstrap";
import {deleteItem, getItems} from "../../services/ItemService";

function ItemListComponent() {

    const [items, setItems] = useState([]);

    const navigator = useNavigate();

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

    function addNewItem() {
        navigator('/item/add')
    }

    function viewItem(id) {
        navigator(`/item/${id}`)
    }

    function editItem(id) {
        navigator(`/item/update/${id}`)
    }

    function removeItem(id) {
        deleteItem(id).then((response) => {
            getAllItems();
        }).catch(error => {
            console.log(error);
        });

    }

    return (
        <div>
            <h1 className = "text-center">Items List</h1>
            <br/>

            <Container fluid>
                <div className="float-right">
                    <Button color="success" onClick={addNewItem}>Add Item</Button>
                </div>
            </Container>
            <table className = "table table-striped">
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
                {
                    items.map(
                        item =>
                            <tr key = {item.id}>
                                <td> {item.item_id}</td>
                                <td> {item.name}</td>
                                <td> {item.description}</td>
                                <td> {item.status}</td>
                                <td> {item.city.name}</td>
                                <td> {item.donor.name}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button size="sm" color="primary" className="m-1" onClick={() => viewItem(item.item_id)}>View</Button>
                                        <Button size="sm" color="secondary" className="m-1" onClick={() => editItem(item.item_id)} >Edit</Button>
                                        <Button size="sm" color="danger" className="m-1" onClick={() => removeItem(item.item_id)}>Delete</Button>
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

export default ItemListComponent;