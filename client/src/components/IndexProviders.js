import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { List, ListItem, ListItemButton, ListItemText, Container } from "@mui/material"
import axios from "axios"
import { endpoints } from "../endpoints"

export function IndexProvider() {
    const navigate = useNavigate();
    const [providers, setProviders] = useState([])

    useEffect(() => {
        getProviders();
    }, [])

    const getProviders = async () => {
        const providers = await axios.get(endpoints.get.users.indexProviders);
        setProviders(providers.data)
    }

    return (
        <Container style={{ textAlign: "left", backgroundColor: "#f4f4f4" }}>
            <h2>Providers</h2>
            <List>
                {providers.map(provider => {
                    return (
                        <React.Fragment>
                            <ListItem key={provider.id} disablePadding style={{ backgroundColor: "#ec8275" }}>
                                <ListItemButton onClick={() => { navigate("/products/provider/" + provider.id) }}>
                                    <ListItemText primary={provider.name} />
                                </ListItemButton>
                            </ListItem>
                            <hr></hr>
                        </React.Fragment>
                    )
                })}
            </List>
        </Container>
    )
}