import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, CircularProgress, Typography, IconButton, Box, Button, TextField, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useGetAllUserQuery } from '../../redux/user-api';
import { UserInfo } from '../../interface';
import UserDrawer from './UserDrawer';
import { CustomChip } from '../../util/CustomChip';
import { RoleEnum, StatusEnum } from '../../enum';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

export const UserTable = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const { data: allUserData, isLoading, isSuccess, isError } = useGetAllUserQuery({ page, size });

    const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleChangePage = (_: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
        setPage(page);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSize(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleViewUser = (user: UserInfo) => {
        setSelectedUser(user);
        setDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setDrawerOpen(false);
        setSelectedUser(null);
    };

    return (
        <>
            <Paper sx={{ width: '100%', maxHeight: '778px', overflow: 'hidden', borderRadius: '20px' }}>
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, p: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                            List of user
                        </Typography>
                        <Box>
                            <Button
                                variant="outlined"
                                startIcon={<FilterListIcon />}
                                sx={{
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    mr: 2,
                                    borderColor: '#E0E0E0',
                                    color: '#000',
                                }}
                            >
                                Filters
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                sx={{
                                    backgroundColor: '#6C63FF',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    '&:hover': {
                                        backgroundColor: '#5a54e5',
                                    },
                                }}
                            >
                                Add new member
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                        <TextField
                            variant="outlined"
                            placeholder="Search for question id, other keywords"
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: '#A0A0A0' }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                mr: 2,
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: '8px',
                                    height: '40px',
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#6C63FF',
                                textTransform: 'none',
                                fontWeight: 500,
                                width: '100px',
                                '&:hover': {
                                    backgroundColor: '#5a54e5',
                                },
                            }}
                        >
                            Search
                        </Button>
                    </Box>
                </Box>
                {isLoading && <CircularProgress sx={{ display: 'block', margin: '0 auto' }} />}

                {isError && <Typography color="error">An error occurred while fetching data.</Typography>}

                {isSuccess && allUserData && (
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{
                            maxHeight: 500,
                            overflow: 'auto',
                        }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No</TableCell>
                                        <TableCell>User ID</TableCell>
                                        <TableCell>Full Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Join Date</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allUserData?.result && allUserData.result.content.map((user: UserInfo, index) => (
                                        <TableRow key={user.userId}>
                                            <TableCell>{page * size + index + 1}</TableCell>
                                            <TableCell>{user.userId}</TableCell>
                                            <TableCell>{user.fullName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                {Array.from(user.roles).map((role, index) => {
                                                    if (role === RoleEnum.ADMIN) {
                                                        return <CustomChip key={index} label={RoleEnum.ADMIN} variant='super' fontWeight={500} fontsize='13px' />;
                                                    } else if (role === RoleEnum.TRAINER) {
                                                        return <CustomChip key={index} label={RoleEnum.TRAINER} variant='info' fontWeight={500} fontsize='13px' />;
                                                    } else {
                                                        return <CustomChip key={index} label={RoleEnum.MEMBER} variant='default' fontWeight={500} fontsize='13px' />;
                                                    }
                                                })}
                                            </TableCell>
                                            <TableCell>{new Date(user.createdDate).toLocaleDateString()}</TableCell>
                                            <TableCell>{
                                                user.status === StatusEnum.ACTIVATED ? <CustomChip label={StatusEnum.ACTIVATED} variant='success' fontWeight={600} fontsize='12px' />
                                                    : user.status === StatusEnum.WAITING ? <CustomChip label={StatusEnum.WAITING} variant='warning' fontWeight={600} fontsize='12px' />
                                                        : <CustomChip label={StatusEnum.DEACTIVATED} variant='default' fontWeight={600} fontsize='12px' />
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <IconButton aria-label="view" onClick={() => handleViewUser(user)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton aria-label="edit">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TablePagination
                            component="div"
                            count={allUserData?.result?.totalElements ?? 0}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={size}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                )}
            </Paper>

            <UserDrawer open={drawerOpen} user={selectedUser} onClose={handleCloseDrawer} />
        </>
    );
};
