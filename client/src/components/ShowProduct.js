import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button, Container } from "@mui/material"
import axios from "axios"
import { endpoints } from "../endpoints"

export const ShowProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({})
    const [order, setOrder] = useState(false)
    const [amount, setAmount] = useState(0)
    const [provider, setProvider] = useState({})

    useEffect(() => {
        const getProduct = async () => {
            try {
                // showProduct: Product || null
                const foundedProduct = await axios.get(endpoints.get.products.show(params.id))
                if (!foundedProduct) return
                setProduct(foundedProduct.data)

                const foundedProvider = (await axios.get(endpoints.get.users.showProvider(foundedProduct.data.providerId))).data
                setProvider(foundedProvider)

                // showClient: Order || null
                const foundedOrder = await axios.get(endpoints.get.orders.showClient(foundedProduct.data.providerId))
                if (!foundedOrder.data) return
                setOrder(true)
                const foundedInOrder = foundedOrder.data.products.find(p => p.id === params.id)
                if (foundedInOrder) setAmount(foundedInOrder.amount)

            } catch (ex) {
                console.log(ex)
            }
        }
        getProduct()
    }, [params.id])

    const handleAdd = async () => {
        const { providerId, id: productId, } = product
        const { name: providerName } = provider
        try {
            if (!order) {
                await axios.post(endpoints.post.orders.new, { providerId, productId, amount, providerName })
            } else {
                await axios.put(endpoints.put.orders.update, { providerId, productId, amount })
            }
            navigate(-1)
        } catch (ex) {
            console.log(ex)
        }
    }
    return (
        <Container style={{ maxWidth: "50%" }}>
            <h1>{product.title}</h1>
            <h2>Price: {product.price}</h2>
            <h3>Amount: {amount}
                <i style={{ fontSize: "30px", cursor: "pointer", color: "blue", paddingLeft: "20px" }} onClick={() => { setAmount(amount + 1) }}>+</i>
                <i style={{ fontSize: "35px", cursor: "pointer", color: "red", paddingLeft: "12px" }} onClick={() => { setAmount(amount - 1) }}>-</i>
            </h3>
            <Button variant="contained" color="primary" onClick={(() => handleAdd())}>Add</Button>
        </Container>
    )
}