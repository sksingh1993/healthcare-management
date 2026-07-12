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
    Box,
    Tooltip
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ScheduleTable({

    schedules,

    doctorId,

    onView,

    onEdit,

    onDelete

}) {

    return (

        <TableContainer component={Paper}>

            <Table>

                <TableHead>

                    <TableRow>
                        {!doctorId && <TableCell>Dr. Name</TableCell>}
                        <TableCell>Day of Week</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                        <TableCell align="center">Slot Duration</TableCell>
                        <TableCell align="center">Consultation Limit</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>

                    </TableRow>

                </TableHead>

                <TableBody>

                    {schedules.map((schedule) => (

                        <TableRow key={schedule.id} hover>
                            {!doctorId && <TableCell>{schedule.doctorName}</TableCell>}
                            <TableCell>{schedule.dayOfWeek}</TableCell>
                            <TableCell>{schedule.startTime}</TableCell>
                            <TableCell>{schedule.endTime}</TableCell>
                            <TableCell align="center">{schedule.slotDuration}</TableCell>
                            <TableCell align="center">{schedule.consultationLimit}</TableCell>
                            <TableCell>

                                <Chip
                                    label={
                                        schedule.active
                                            ? "Active"
                                            : "Inactive"
                                    }
                                    color={
                                        schedule.active
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

                                    {/* <IconButton
                                        color="primary"
                                        onClick={() => onView(leave.id)}
                                    >
                                        <VisibilityIcon />
                                    </IconButton> */}

                                    <IconButton
                                        color="warning"
                                        onClick={() => onEdit(doctorId, schedule.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => onDelete(schedule)}
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