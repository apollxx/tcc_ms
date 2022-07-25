import React, { useEffect } from 'react';
import axios from 'axios';
import { endpoints } from "../endpoints";

const Signout = () => {
    const request = async () => {
        try {
            await axios.post(endpoints.post.users.signout)
            window.location.href = "/"
        } catch (ex) {

        }
    }

    useEffect(() => {
        request()
    }, [])
    return (<React.Fragment></React.Fragment>)
}

export default Signout