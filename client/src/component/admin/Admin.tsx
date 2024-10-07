
import { Container, AppBar, Toolbar, Typography, Box, Button, TextField, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';


function Admin() {
    return (
        <Box sx={{
            background: '#F3F4F6',
            display: 'flex',
            height: '100vh',
            margin: 0,
            padding: 0,
        }}>
            <Sidebar />
            <Outlet />
        </Box>
    );
}

export default Admin;
