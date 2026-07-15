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
    Box
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import LoginIcon from "@mui/icons-material/Login";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export default function AppointmentTable({

    appointments,

    loading,

    onView,

    onEdit,

    onCancel,

    onCheckIn,

    onComplete

}) {

    const getStatusColor = (status) => {

        switch (status) {

            case "BOOKED":
                return "primary";

            case "CHECKED_IN":
                return "warning";

            case "COMPLETED":
                return "success";

            case "CANCELLED":
                return "error";

            default:
                return "default";
        }

    };

    return (

        <TableContainer component={Paper}>

            <Table>

                <TableHead>

                    <TableRow>

                        <TableCell>Code</TableCell>

                        <TableCell>Patient</TableCell>

                        <TableCell>Doctor</TableCell>

                        <TableCell>Date</TableCell>

                        <TableCell>Time</TableCell>

                        <TableCell>Type</TableCell>

                        <TableCell>Status</TableCell>

                        <TableCell align="center">Actions</TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {loading ? (

                        <TableRow>

                            <TableCell
                                colSpan={8}
                                align="center"
                            >
                                Loading appointments...
                            </TableCell>

                        </TableRow>

                    ) : appointments.length === 0 ? (

                        <TableRow>

                            <TableCell
                                colSpan={8}
                                align="center"
                            >
                                No appointments found.
                            </TableCell>

                        </TableRow>

                    ) : (

                        appointments.map((appointment) => (

                            <TableRow
                                key={appointment.id}
                                hover
                            >

                                <TableCell>
                                    {appointment.appointmentCode}
                                </TableCell>

                                <TableCell>
                                    {appointment.patientName}
                                </TableCell>

                                <TableCell>
                                    {appointment.doctorName || "-"}
                                </TableCell>

                                <TableCell>
                                    {appointment.appointmentDate}
                                </TableCell>

                                <TableCell>
                                    {appointment.appointmentTime}
                                </TableCell>

                                <TableCell>
                                    {appointment.appointmentType}
                                </TableCell>

                                <TableCell>

                                    <Chip
                                        label={appointment.status}
                                        color={getStatusColor(appointment.status)}
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
                                            onClick={() => onView(appointment.id)}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>

                                        {appointment.status === "BOOKED" && (

                                            <>

                                                <IconButton
                                                    color="warning"
                                                    onClick={() => onEdit(appointment.id)}
                                                >
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton
                                                    color="error"
                                                    onClick={() => onCancel(appointment)}
                                                >
                                                    <CancelIcon />
                                                </IconButton>

                                                <IconButton
                                                    color="success"
                                                    onClick={() => onCheckIn(appointment.id)}
                                                >
                                                    <LoginIcon />
                                                </IconButton>

                                            </>

                                        )}

                                        {appointment.status === "CHECKED_IN" && (

                                            <IconButton
                                                color="success"
                                                onClick={() => onComplete(appointment.id)}
                                            >
                                                <TaskAltIcon />
                                            </IconButton>

                                        )}

                                    </Box>

                                </TableCell>

                            </TableRow>

                        ))

                    )}

                </TableBody>
            </Table>

        </TableContainer >

    );

}