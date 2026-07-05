import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from "@mui/material";

export default function ConfirmDialog({

    open,

    title,

    message,

    onConfirm,

    onCancel,

    loading = false

}) {

    return (

        <Dialog
            open={open}
            onClose={onCancel}
            disableRestoreFocus
            disableAutoFocus
            maxWidth="xs"
            fullWidth
        >

            <DialogTitle>
                {title}
            </DialogTitle>

            <DialogContent>

                <DialogContentText>

                    {message}

                </DialogContentText>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    color="error"
                    variant="contained"
                    onClick={onConfirm}
                    disabled={loading}
                >
                    {loading ? "Deleting..." : "Delete"}
                </Button>

            </DialogActions>

        </Dialog>

    );

}