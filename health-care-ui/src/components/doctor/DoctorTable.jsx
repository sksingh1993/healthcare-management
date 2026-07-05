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

export default function DoctorTable({

    doctors,

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
                        <TableCell>Specialization</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {doctors.map((doctor) => (

                        <TableRow key={doctor.id} hover>

                            <TableCell>{doctor.doctorCode}</TableCell>

                            <TableCell>{doctor.fullName}</TableCell>

                            <TableCell>{doctor.mobile}</TableCell>

                            <TableCell>{doctor.specialization}</TableCell>

                            <TableCell>

                                <Chip
                                    label={
                                        doctor.active
                                            ? "Active"
                                            : "Inactive"
                                    }
                                    color={
                                        doctor.active
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
                                        onClick={() => onView(doctor.id)}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>

                                    <IconButton
                                        color="warning"
                                        onClick={() => onEdit(doctor.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => onDelete(doctor)}
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