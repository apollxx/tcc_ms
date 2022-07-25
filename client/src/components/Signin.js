import React, { useState } from "react"
import axios from "axios"
import { Container, TextField, Button } from "@mui/material";
import { endpoints } from "../endpoints";

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async event => {
        try {
            await axios.post(endpoints.post.users.signin, { email, password })
            window.location.href = "/"
        } catch (ex) {

        }
    }

    return (
        <Container style={{ textAlign: "left" }}>
            <h2>Sign In</h2>
            <form>
                <TextField style={{ display: "flex" }} label="email" value={email} onChange={e => setEmail(e.target.value)} ></TextField>
                <TextField style={{ display: "flex" }} type={"password"} label="password" value={password} onChange={e => setPassword(e.target.value)}></TextField>
                <Button variant="contained" color="primary" onClick={onSubmit}>Sign In</Button>
            </form>
        </Container>
    )
}