import React, { useState } from 'react';
import { Drawer, Box, Tabs, Tab, Typography } from '@mui/material';
import UserOverviewTab from './UserOverviewTab';
import UserLogsTab from './UserLogsTab';
import { UserInfo } from '../../interface';
import ClearIcon from '@mui/icons-material/Clear';

interface UserDrawerProps {
    open: boolean;
    user: UserInfo | null;
    onClose: () => void;
}

const UserDrawer: React.FC<UserDrawerProps> = ({ open, user, onClose }) => {
    const [selectedTab, setSelectedTab] = useState(0);

    if (!user) return null;

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mx: 3,
                my: 4 
            }}>
                <Typography variant="h5" gutterBottom sx={{
                    fontWeight: 'bold',
                    fontSize: 18,
                }}>{user.fullName}</Typography>
                <ClearIcon onClick={onClose} />
            </Box>
            <Box sx={{ width: 720 }}>
                <Tabs value={selectedTab} onChange={handleChangeTab} aria-label="User Tabs">
                    <Tab label="Overview" sx={{ margin: 0 }} />
                    <Tab label="Logs" sx={{margin: 0 }} />
                </Tabs>

                {selectedTab === 0 && <UserOverviewTab user={user} />}
                {selectedTab === 1 && <UserLogsTab user={user} />}
            </Box>
        </Drawer>
    );
};

export default UserDrawer;
