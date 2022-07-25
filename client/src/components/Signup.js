import React, { useState } from "react"
import axios from "axios"
import { Container, TextField, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { endpoints } from "../endpoints";

export default function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('client')

    const onSubmit = async event => {
        try {
            await axios.post(endpoints.post.users.signup, { email, password, name, role })
            window.location.href = "/"
        } catch (ex) {

        }
    }

    return (
        <Container style={{ textAlign: "left" }}>
            <h2>Sign Up</h2>
            <form >
                <TextField style={{ display: "flex" }} label="name" value={name} onChange={e => setName(e.target.value)} ></TextField>
                <TextField style={{ display: "flex" }} label="email" value={email} onChange={e => setEmail(e.target.value)} ></TextField>
                <TextField style={{ display: "flex" }} type={"password"} label="password" value={password} onChange={e => setPassword(e.target.value)}></TextField>
                <FormLabel>Role</FormLabel>
                <RadioGroup
                    name="radio-role"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                >
                    <FormControlLabel value="client" control={<Radio />} label="Client" />
                    <FormControlLabel value="provider" control={<Radio />} label="Provider" />
                </RadioGroup>
                <Button variant="contained" color="primary" onClick={onSubmit}>Sign Up</Button>
            </form>
        </Container>
    )
} 