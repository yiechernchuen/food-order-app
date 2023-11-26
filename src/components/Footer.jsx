import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Footer({ toPage, link }) {
    return (
        <footer className='footer'>
            <Link to={link}>
                <Button variant='contained'>{toPage}</Button>
            </Link>
        </footer>
    );
}

export default Footer;
