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

export default function StaffTable({

    staffs,

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
                        <TableCell>Mobile</TableCell>
                        <TableCell>Department</TableCell>
                        <TableCell>Designation</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {staffs.map((staff) => (

                        <TableRow key={staff.id} hover>

                            <TableCell>{staff.employeeCode}</TableCell>

                            <TableCell>{staff.fullName}</TableCell>

                            <TableCell>{staff.mobile}</TableCell>

                            <TableCell>{staff.department}</TableCell>

                            <TableCell>{staff.designation}</TableCell>

                            <TableCell>

                                <Chip
                                    label={
                                        staff.active
                                            ? "Active"
                                            : "Inactive"
                                    }
                                    color={
                                        staff.active
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
                                        onClick={() => onView(staff.id)}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>

                                    <IconButton
                                        color="warning"
                                        onClick={() => onEdit(staff.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => onDelete(staff)}
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