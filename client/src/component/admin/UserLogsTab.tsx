import { Box, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, InputAdornment, Paper, Typography } from '@mui/material';
import { useGetLogUserQuery } from '../../redux/logs-user';
import { UserInfo } from '../../interface';
import { AvatarIcon } from '../../util/avatar/AvatarIcon';
import SearchIcon from '@mui/icons-material/Search';
import { formatDate } from './UserTable';

const UserLogsTab = ({ user }: { user: UserInfo }) => {
    const { data: logsData } = useGetLogUserQuery({ userId: user.userId });
    return (
        <Box>
            <Box sx={{
                p: 2,
            }}>
                <TextField
                    variant="outlined"
                    placeholder="Search something"
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#A0A0A0' }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                        },
                    }}
                />
                <Table sx={{ width: '100%' }}>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ borderBottom: 'none', width: '20%', padding: 0}}>
                                Created date
                            </TableCell>
                            <TableCell sx={{ borderBottom: 'none', padding: 0}}>
                                <TextField
                                    fullWidth
                                    disabled
                                    value={formatDate(user.createdDate)}
                                    InputProps={{ readOnly: true }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '8px',
                                            height: '40px',
                                            marginY: 2,
                                        },
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ borderBottom: 'none', width: '20%', padding: 0}}>
                                Updated
                            </TableCell>
                            <TableCell sx={{ borderBottom: 'none', padding: 0}}>
                                <TextField
                                    fullWidth
                                    disabled
                                    value={formatDate(user.updatedDate)}
                                    InputProps={{ readOnly: true }}
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

            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
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
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            p: 2,
                                        }}
                                    >
                                        <AvatarIcon variant='circular' name={user.fullName} fontSize='24px' width='40px' height='40px' />
                                        <div>
                                            <Typography variant="h6" sx={{
                                                fontSize: 14,
                                                fontWeight: 600,
                                            }}>
                                                {user.fullName}
                                            </Typography>
                                            <Typography variant="body2" sx={{
                                                fontSize: 14,
                                                fontWeight: 400,
                                                color: 'text.secondary',
                                            }}>
                                                {formatDate(log.timestamp)}
                                            </Typography>
                                        </div>
                                    </Box>
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
