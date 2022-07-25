import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

export default function NavButton(props) {
    const navigate = useNavigate();
    return (
        <Button color="inherit" onClick={() => { navigate(props.navigateTo) }}>{props.text}</Button>
    )
}