import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    IconButton,
    Stack,
    Box
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function LeaveTable({

    leaves,

    onView,

    onEdit,

    onDelete

}) {

    return (

        <TableContainer component={Paper}>

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell>Code</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>From Date</TableCell>
                        <TableCell>To Date</TableCell>
                        <TableCell>No of Day(s)</TableCell>
                        <TableCell>Leave Type</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {leaves.map((leave) => (

                        <TableRow key={leave.id} hover>
                            <TableCell>{leave.doctorCode}</TableCell>
                            <TableCell>{leave.doctorName}</TableCell>
                            <TableCell>{leave.fromDate}</TableCell>
                            <TableCell>{leave.toDate}</TableCell>
                            <TableCell>{leave.numberOfDays}</TableCell>
                            <TableCell>{leave.leaveType}</TableCell>
                            <TableCell>{leave.reason}</TableCell>
                            <TableCell>

                                <Chip
                                    label={
                                        leave.active
                                            ? "Active"
                                            : "Inactive"
                                    }
                                    color={
                                        leave.active
                                            ? "success"
                                            : "error"
                                    }
                                    size="small"
                                />

                            </TableCell>

                            <TableCell align="center">

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: 1
                                    }}
                                >

                                    <IconButton
                                        color="primary"
                                        onClick={() => onView(leave.id)}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>

                                    <IconButton
                                        color="warning"
                                        onClick={() => onEdit(leave.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => onDelete(leave)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>

                                </Box>

                            </TableCell>

                        </TableRow>

                    ))}

                </TableBody>

            </Table>

        </TableContainer>

    );

}