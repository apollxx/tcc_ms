import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container } from "@mui/material"
import { endpoints } from "../endpoints"

export const IndexProviderProducts = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const req = await axios.get(endpoints.get.products.indexProvider(params.id))
                setProducts(req.data)
            } catch (ex) {

            }
        }
        getProducts()
    }, [params.id])
    return (
        <Container style={{ maxWidth: "70%" }}>
            <h2>Products</h2>
            <TableContainer component={Paper}>
                <Table size="medium" >
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(p => {
                            return (
                                <TableRow hover style={{ cursor: "pointer" }} onClick={() => { navigate("/products/" + p.id) }}>
                                    <TableCell>{p.title}</TableCell>
                                    <TableCell>{p.price}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}