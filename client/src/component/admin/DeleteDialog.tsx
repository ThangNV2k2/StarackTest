import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";

interface DeleteDialogProps {
    open: boolean;
    handleClose: () => void;
    handleDelete: () => void;
}
export const DeleteDialog = ({ open, handleClose, handleDelete }: DeleteDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            sx={{
                '& .MuiPaper-root': {
                    borderRadius: '20px',
                    padding: 2,
                    width: '444px',
                }
            }}
        >
            <DialogTitle sx={{ fontWeight: 'bold', fontSize: '20px', mb: 1 }}>
                Confirm delete
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" sx={{ color: '#6C737F', mb: 2 }}>
                    Are you sure you want to delete this user? This action can not be undone.
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'flex-end', paddingBottom: 2 }}>
                <Button
                    onClick={handleClose}
                    sx={{
                        color: '#111927',
                        background: '#FFFFFF',
                        boxShadow: 'none',
                        textTransform: 'none',
                        fontWeight: 500,
                        mr: 2,
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button onClick={handleDelete} variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
