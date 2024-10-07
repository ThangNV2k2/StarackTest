import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper, CircularProgress, Typography, IconButton, Box, Button, TextField, InputAdornment, Card, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDeleteUserMutation, useGetAllUserQuery } from '../../redux/user-api';
import { UserInfo } from '../../interface';
import UserDrawer from './UserDrawer';
import { CustomChip } from '../../util/CustomChip';
import { RoleEnum, StatusEnum } from '../../enum';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { format } from 'date-fns';
import { DeleteDialog } from './DeleteDialog';

export function formatDate(date: Date): string {
    return format(date, "dd/MMMM/yyyy h:mm a");
}

export const UserTable = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const { data: allUserData, isLoading, isSuccess, isError, refetch: refetchTable } = useGetAllUserQuery({ page, size });
    const [ triggerDelete ] = useDeleteUserMutation();

    const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [deleteDialog, setDeleteDialog] = useState<{
        open: boolean;
        userId: string;
    }>({ open: false, userId: '' });
    
    const handleDelete = async () => {
        try {
            const result = await triggerDelete(deleteDialog.userId).unwrap();

            if (result?.result) {
                refetchTable();
                setDeleteDialog({ open: false, userId: '' });
            } else {
                console.error(result?.message);
            }
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

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
            <Card sx={{ width: '100%', maxHeight: '820px' }}>
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
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
                                    backgroundColor: '#E0E0E0',
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

                    <Box sx={{ display: 'flex', alignItems: 'center', p: 2, borderTop: 1, borderColor: "#F3F4F6" }}>
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
                    <Paper>
                        <TableContainer
                            sx={{
                                maxHeight: 582,
                                overflow: 'auto',
                                '&::-webkit-scrollbar': {
                                    width: '5px',
                                    height: '5px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: '#f5f5f5',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#bbb',
                                    borderRadius: '10px',
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                    backgroundColor: '#999',
                                },
                            }}
                        >
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No</TableCell>
                                        <TableCell sx={{ width: '150px' }}>User Id</TableCell>
                                        <TableCell sx={{ width: '200px' }}>Full Name</TableCell>
                                        <TableCell sx={{ width: '318px' }}>Email</TableCell>
                                        <TableCell sx={{ width: '200px' }}>Role</TableCell>
                                        <TableCell sx={{ width: '155px', textAlign: 'center' }}>Join Date</TableCell>
                                        <TableCell sx={{ width: '150px' }}>Status</TableCell>
                                        <TableCell sx={{ width: '150px' }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>Action</Box>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {allUserData?.result?.content?.map((user: UserInfo, index) => (
                                        <TableRow key={user.userId}>
                                            <TableCell>{page * size + index + 1}</TableCell>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Box
                                                        sx={{
                                                            maxWidth: '130px',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <Tooltip title={user.userId} arrow>
                                                            <span>{user.userId}</span>
                                                        </Tooltip>
                                                    </Box>
                                                    <IconButton color="primary">
                                                        <ContentCopyIcon />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                <Tooltip title={user.fullName} arrow>
                                                    <span>{user.fullName}</span>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                {Array.from(user.roles).map((role, index) => (
                                                    <CustomChip
                                                        key={index}
                                                        label={role}
                                                        variant={
                                                            role === RoleEnum.ADMIN
                                                                ? 'super'
                                                                : role === RoleEnum.TRAINER
                                                                    ? 'info'
                                                                    : 'default'
                                                        }
                                                        fontWeight={500}
                                                        fontsize="13px"
                                                    />
                                                ))}
                                            </TableCell>
                                            <TableCell sx={{ textAlign: 'center' }}>{formatDate(user.createdDate)}</TableCell>
                                            <TableCell>
                                                <CustomChip
                                                    label={user.status === StatusEnum.ACTIVATED ? StatusEnum.ACTIVATED : user.status === StatusEnum.WAITING ? StatusEnum.WAITING : StatusEnum.DEACTIVATED}
                                                    variant={
                                                        user.status === StatusEnum.ACTIVATED
                                                            ? 'success'
                                                            : user.status === StatusEnum.WAITING
                                                                ? 'warning'
                                                                : 'default'
                                                    }
                                                    fontWeight={600}
                                                    fontsize="12px"
                                                />
                                            </TableCell>
                                            <TableCell sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <IconButton aria-label="view" onClick={() => handleViewUser(user)}>
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton aria-label="edit">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" onClick={() => setDeleteDialog({open: true, userId:user.userId })}>
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
            </Card>

            <UserDrawer open={drawerOpen} user={selectedUser} onClose={handleCloseDrawer} />
            <DeleteDialog
                open={deleteDialog.open}
                handleClose={() => setDeleteDialog({ open: false, userId: '' })}
                handleDelete={handleDelete}
            />
        </>
    );
};
