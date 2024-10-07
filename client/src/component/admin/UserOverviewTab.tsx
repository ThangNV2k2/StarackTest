import React from 'react';
import { Box, Typography, Avatar, TextField } from '@mui/material';
import { UserInfo } from '../../interface';
import { AvatarIcon } from '../../util/avatar/AvatarIcon';
import { AccountTypeEnum, RoleEnum, StatusEnum } from '../../enum';
import { CustomChip } from '../../util/CustomChip';

interface UserOverviewTabProps {
    user: UserInfo;
}

const UserOverviewTab: React.FC<UserOverviewTabProps> = ({ user }) => {
    return (
        <Box sx={{ padding: 2 }}>
            <TextField label="User ID" fullWidth margin="normal" value={user.userId} InputProps={{ readOnly: true }} />
            <TextField label="Avatar" fullWidth margin="normal" value={""} 
                InputProps={{ readOnly: true,
                    startAdornment: (
                        <AvatarIcon
                            variant='rounded'
                            name={user?.fullName}
                            fontSize='18px'
                            width='30px'
                            height='30px'
                        />
                    )
                 }} />
            <TextField label="Email" fullWidth margin="normal" value={user.email} InputProps={{ readOnly: true }} />
            <TextField label="Full Name" fullWidth margin="normal" value={user.fullName} InputProps={{ readOnly: true }} />
            <TextField label="Phone" fullWidth margin="normal" value={user.phone} InputProps={{ readOnly: true }} />
            <TextField
                label="Role"
                fullWidth
                margin="normal"
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {Array.from(user.roles).map((role, index) => {
                                if (role === RoleEnum.ADMIN) {
                                    return <CustomChip key={index} label={RoleEnum.ADMIN} variant='super' fontWeight={500} fontsize='13px' />;
                                } else if (role === RoleEnum.TRAINER) {
                                    return <CustomChip key={index} label={RoleEnum.TRAINER} variant='info' fontWeight={500} fontsize='13px' />;
                                } else {
                                    return <CustomChip key={index} label={RoleEnum.MEMBER} variant='default' fontWeight={500} fontsize='13px' />;
                                }
                            })}
                        </Box>
                    )
                }}
                value=""
            />
            <TextField label="Account type" fullWidth margin="normal" value={user.status}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            {user.accountType === AccountTypeEnum.PREMIUM ? (
                                <CustomChip
                                    label={AccountTypeEnum.PREMIUM}
                                    variant="super"
                                    fontWeight={600}
                                />
                            ) : (
                                <CustomChip
                                    label={AccountTypeEnum.FREE}
                                    variant="success"
                                    fontWeight={600}
                                />
                            )}
                        </Box>
                    ),
                }}
            />
            <TextField label="Nationality" fullWidth margin="normal" value={user.nationality} InputProps={{ readOnly: true }} />
            <TextField
                label="Status"
                fullWidth
                margin="normal"
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            {user.status === StatusEnum.ACTIVATED ? (
                                <CustomChip
                                    label={StatusEnum.ACTIVATED}
                                    variant="success"
                                    fontWeight={600}
                                />
                            ) : user.status === StatusEnum.WAITING ? (
                                <CustomChip
                                    label={StatusEnum.WAITING}
                                    variant="warning"
                                    fontWeight={600}
                                />
                            ) : (
                                <CustomChip
                                    label={StatusEnum.DEACTIVATED}
                                    variant="default"
                                    fontWeight={600}
                                />
                            )}
                        </Box>
                    ),
                }}
            />
            <TextField label="Language" fullWidth margin="normal" value={user.language} InputProps={{ readOnly: true }} />
        </Box>
    );
};

export default UserOverviewTab;
