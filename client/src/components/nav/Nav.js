import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Grid } from '@mui/material';
import { UserContext } from '../../UserContext'
import NavButton from './NavButton';


export default function Nav() {
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const links = [
        !user && <NavButton key={'signup'} navigateTo={'/users/signup'} text={'Sign Up'} />,
        !user && <NavButton key={'singin'} navigateTo={'/users/signin'} text={'Sign In'} />,
        user && user.role === "provider" && <NavButton key={'newproduct'} navigateTo={"/products/new"} text={"Register Product"} />,
        user && user.role === "client" && <NavButton key={'openorders'} navigateTo={"/orders/shopping"} text={"Open Orders"} />,
        user && <NavButton key={'completedorders'} navigateTo={"/orders/completed"} text={"Completed Orders"} />,
        user && <NavButton key={'signout'} navigateTo={"/users/signout"} text={"Sign Out"} />,
    ]

    return (
        <Box sx={{ flexGrow: 1 }} style={{ paddingBottom: '5px' }}>
            <AppBar position="sticky">
                <Toolbar>
                    <h2 onClick={() => { navigate('/') }} style={{ cursor: "pointer" }}>MsApp</h2>
                    <Grid container justifyContent="flex-end">
                        {links}
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
