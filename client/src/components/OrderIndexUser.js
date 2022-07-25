import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';
import { List, ListItem, ListItemText, Container, Button } from "@mui/material"
import { endpoints } from '../endpoints'

export const OrderIndexUser = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const foundedOrders = (await axios.get(endpoints.get.orders.indexUser(params.status))).data;
                if (foundedOrders.length === 0) return
                setOrders(foundedOrders)
            } catch (ex) {
                console.log(ex)
            }
        }
        getOrder()
    }, [])
    const computeTotalPrice = (order) => {
        let price = 0;
        order.products.forEach(product => {
            price = price + product.price * product.amount
        })
        return price
    }

    const handleOrderFinish = async (id) => {
        try {
            await axios.put(endpoints.put.orders.completeOrder(id))
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <Container style={{ textAlign: "center", backgroundColor: "" }}>
            {orders.map(order => {
                return (
                    <React.Fragment>
                        <List style={{ backgroundColor: "#f9f68b" }}>
                            <ListItem>
                                <ListItemText primary={"Provider: " + order.providerName} />
                            </ListItem>
                            <ListItem>
                                <ListItemText primary={"Products: "} />
                            </ListItem>
                            {order.products.map(product => {
                                return (
                                    <div style={{ backgroundColor: "#ffaa9a" }}>
                                        <ListItem sx={{ pl: 6 }}>
                                            <ListItemText primary={"Title: " + product.title} />
                                        </ListItem>
                                        <ListItem sx={{ pl: 6 }}>
                                            <ListItemText primary={"Price: " + product.price} />
                                        </ListItem>
                                        <ListItem sx={{ pl: 6 }}>
                                            <ListItemText primary={"Amount: " + product.amount} />
                                        </ListItem>
                                        <hr></hr>
                                    </div>)
                            })}
                            <ListItem>
                                <ListItemText primary={"Total Price: " + computeTotalPrice(order)} />
                            </ListItem>
                            {order.status === "shopping" ? <Button variant="contained" color="primary" onClick={() => handleOrderFinish(order.id)}>Finish</Button> : <React.Fragment></React.Fragment>}
                        </List>
                        <br></br>
                        <hr></hr>
                    </React.Fragment>

                )
            })}

        </Container >
    )
}