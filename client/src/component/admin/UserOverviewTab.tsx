import React from 'react';
import { Box, Typography, Avatar, TextField, Table, TableBody, TableRow, TableCell, InputAdornment } from '@mui/material';
import { UserInfo } from '../../interface';
import { AvatarIcon } from '../../util/avatar/AvatarIcon';
import { AccountTypeEnum, RoleEnum, StatusEnum } from '../../enum';
import { CustomChip } from '../../util/CustomChip';

interface UserOverviewTabProps {
    user: UserInfo;
}

const UserOverviewTab: React.FC<UserOverviewTabProps> = ({ user }) => {
    return (
        <Box sx={{ padding: 3 }}>
            <Table sx={{ width: '100%' }}>
                <TableBody>
                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', width: '20%', padding: 0, margin: 0 }}>
                            User ID
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', width: '80%', padding: 0, margin: 0 }}>
                            <TextField
                                fullWidth
                                margin="normal"
                                value={user.userId}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                sx={{ 
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        height: '40px',
                                    },
                                 }}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            Avatar
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            <Box sx={{
                                borderRadius: 1,
                                border: '1px #F3F4F6',
                                width: 80,
                                height: 80,
                            }}>
                                <AvatarIcon
                                    variant='rounded'
                                    name={user.fullName}
                                    fontSize='30px'
                                    width='60px'
                                    height='60px'
                                />
                            </Box>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            Email
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            <TextField
                                fullWidth
                                margin="normal"
                                value={user.email}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        height: '40px',
                                    },
                                }}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            Full Name
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            <TextField
                                fullWidth
                                margin="normal"
                                value={user.fullName}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        height: '40px',
                                    },
                                }}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            Phone
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            <TextField
                                fullWidth
                                margin="normal"
                                value={user.phone}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        height: '40px',
                                    },
                                }}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            Role
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            <TextField
                                fullWidth
                                disabled
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                                {Array.from(user.roles).map((role, index) => (
                                                    <CustomChip
                                                        key={index}
                                                        label={role}
                                                        variant={role === RoleEnum.ADMIN ? 'super' : role === RoleEnum.TRAINER ? 'info' : 'default'}
                                                        fontWeight={500}
                                                        fontsize='13px'
                                                    />
                                                ))}
                                            
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        height: '40px',
                                    },
                                }}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            Account Type
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            <TextField
                                fullWidth
                                margin="normal"
                                value={""}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {Array.from(user.roles).map((role, index) => (
                                                <CustomChip
                                                    key={index}
                                                    label={user.accountType}
                                                    variant={user.accountType === AccountTypeEnum.PREMIUM ? 'super' : 'info'}
                                                    fontWeight={500}
                                                    fontsize='13px'
                                                />
                                            ))}

                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        height: '40px',
                                    },
                                }}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            Nationality
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            <TextField
                                fullWidth
                                margin="normal"
                                value={user.nationality}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        height: '40px',
                                    },
                                }}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            Status
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            <TextField
                                fullWidth
                                margin="normal"
                                value={""}
                                InputProps={{
                                    readOnly: true,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {Array.from(user.roles).map((role, index) => (
                                                <CustomChip
                                                    key={index}
                                                    label={user.status}
                                                    variant={
                                                        user.status === StatusEnum.ACTIVATED
                                                            ? 'success'
                                                            : user.status === StatusEnum.WAITING
                                                                ? 'warning'
                                                                : 'default'
                                                    }
                                                    fontWeight={500}
                                                    fontsize='13px'
                                                />
                                            ))}

                                        </InputAdornment>
                                    ),
                                }}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        height: '40px',
                                    },
                                }}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            Language
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none', padding: 0, margin: 0 }}>
                            <TextField
                                fullWidth
                                margin="normal"
                                value={user.language}
                                InputProps={{ readOnly: true }}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                        height: '40px',
                                    },
                                }}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Box>
    );
};

export default UserOverviewTab;
