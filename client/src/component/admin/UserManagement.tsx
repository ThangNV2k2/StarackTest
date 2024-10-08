import { Box, IconButton, Typography } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { AvatarIcon } from "../../util/avatar/AvatarIcon";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { UserTable } from "./UserTable";
import { useNavigate } from "react-router-dom";

export const UserManagement = () => {
    const { userInfo, changeUserInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <Box sx={{
            p: 3,
            width: '100%',
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1,
            }}>
                <SearchIcon sx={{
                    color: '#6C737F',
                }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AvatarIcon
                            variant='circular'
                            name={userInfo?.fullName}
                            fontSize='20px'
                            width='30px'
                            height='30px'
                        />
                        <IconButton>
                            <ArrowDropDownIcon onClick={() => {
                                changeUserInfo();
                                localStorage.removeItem('token');
                                navigate('/login');
                            }} sx={{ color: '#b0b0b0', ml: 1 }} />
                        </IconButton>

                </Box>
            </Box>

            <Box sx={{
                mx: '80px',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}>

                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                    User Management
                </Typography>

                <UserTable />
            </Box>
        </Box>
    )
}
