import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getAvailableItems} from "../services/ItemService";

function AvailableItems() {

    const [items, setItems] = useState('');

    const navigator = useNavigate();

    useEffect(() => {
        getAvailableItems().then((response) => {
            setItems(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);


    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Available Items</h2>

            <div className="row">
                {items.length > 0 ? (
                    items.map((item) => (
                        <div className="col-md-4 mb-4" key={item.itemId}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text">Date Published: {item.date_created}</p>
                                    <p className="card-text">
                                        <small className="text-muted">
                                            Status: <span className="badge bg-success">Available</span>
                                        </small>
                                    </p>
                                </div>
                                <div className="card-footer text-center">
                                    <button onClick={() => navigator(`/item/${item.item_id}`)} className="btn btn-primary">View Item</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            No items available at the moment.
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AvailableItems;