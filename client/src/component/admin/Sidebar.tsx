import {
    Drawer, List, ListItem, ListItemText, ListItemIcon,
    Avatar, Typography, Box, ListItemButton
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { useContext, useState } from 'react';
import { AuthContext } from '../../AuthContext';
import { AvatarIcon } from '../../util/avatar/AvatarIcon';

const drawerWidth = 240;

const NAVIGATION = [
    {
        segment: 'overview',
        title: 'Overview',
        icon: <HomeIcon />,
    },
    {
        segment: 'user-management',
        title: 'User Management',
        icon: <PeopleIcon />,
    },
];

function Sidebar() {
    const { userInfo } = useContext(AuthContext);
    const [pathname, setPathname] = useState('/overview');

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#121621',
                    border: 1,
                    borderColor: '#384250',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    color: '#FFFFFF',
                }}
            >
                <AvatarIcon
                    variant='rounded'
                    name={userInfo?.fullName}
                    fontSize='20px'
                    width='30px'
                    height='30px'
                />
                <div>
                    <Typography variant="h6" sx={{
                        fontSize: 18,
                        fontWeight: 700,
                    }}>
                        Loom
                    </Typography>
                    <Typography variant="body2" sx={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: '#b0b0b0',
                    }}>
                        Version 1.0
                    </Typography>
                </div>
            </Box>

            <List>
                {NAVIGATION.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            onClick={() => setPathname(item.segment)}
                            selected={pathname === item.segment}
                            sx={{
                                borderRadius: '8px',
                                margin: '4px',
                                height: '36px',
                                '&.Mui-selected': {
                                    backgroundColor: '#6C63FF',
                                    '&:hover': {
                                        backgroundColor: '#5a54e5',
                                    },
                                },
                                '&:hover': {
                                    backgroundColor: '#333748',
                                },
                            }}
                        >
                            <ListItemIcon sx={{ color: pathname === item.segment ? '#ffffff' : '#b0b0b0' }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.title}
                                primaryTypographyProps={{
                                    sx: {
                                        color: pathname === item.segment ? '#ffffff' : '#b0b0b0',
                                        fontWeight: 500,
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;
