import React, { useState } from "react"
import axios from "axios"
import { Container, TextField, Button } from "@mui/material"
import { endpoints } from "../endpoints"

export function NewProduct() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);

    const onSubmit = async event => {
        try {
            await axios.post(endpoints.post.products.new, { title, price })
            setTitle('')
            setPrice(0)
        } catch (ex) {

        }
    }

    return (
        <Container style={{ textAlign: "left" }}>
            <h2>Register Product</h2>
            <form>
                <TextField style={{ display: "flex" }} label="Title" value={title} onChange={e => setTitle(e.target.value)} ></TextField>
                <TextField style={{ display: "flex" }} type={"number"} label="Price" value={price} onChange={e => setPrice(e.target.value)}></TextField>
                <Button variant="contained" color="primary" onClick={onSubmit}>Confirm</Button>
            </form>
        </Container>
    )
}