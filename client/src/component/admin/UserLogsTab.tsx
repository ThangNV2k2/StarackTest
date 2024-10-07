import React from 'react';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material';
import { useGetLogUserQuery } from '../../redux/logs-user';
import { UserInfo } from '../../interface';
import { AvatarIcon } from '../../util/avatar/AvatarIcon';

const UserLogsTab = ({ user }: { user: UserInfo }) => {
    const { data: logsData } = useGetLogUserQuery({ userId: user.userId });
    return (
        <Box sx={{ padding: 2 }}>
            <TextField label="Created Date" fullWidth margin="normal" value="21/May/2024 7:45 AM" InputProps={{ readOnly: true }} />
            <TextField label="Updated" fullWidth margin="normal" value="24/Jun/2024 7:45 AM" InputProps={{ readOnly: true }} />

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Timer</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logsData?.result && logsData.result.map((log) => (
                            <TableRow key={log.logId}>
                                <TableCell>
                                    <AvatarIcon variant='circular' name={user.fullName} fontSize='24px' width='40px' height='40px' />
                                    {user.fullName} <br />
                                    {`${log.timestamp}`}
                                </TableCell>
                                <TableCell>{log.changeType}</TableCell>
                                <TableCell>{log.action}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default UserLogsTab;
