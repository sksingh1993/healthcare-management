import { TableRows } from "@mui/icons-material";
import { Box, Chip, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function PatientTable({
    patients,
    onView,
    onEdit,
    onDelete
}){
    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Mobile</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        patients.map((patient)=>(
                            <TableRow key={patient.id} hover>
                                <TableCell>{patient.patientCode}</TableCell>
                                <TableCell>{patient.fullName}</TableCell>
                                <TableCell>{patient.mobile}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={patient.active?"Active":"Inactive"}
                                        color={patient.active?"success":"error"}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display:"flex",
                                            justifyContent:"center",
                                            gap:1
                                        }}>
                                        <IconButton
                                        color="primary"
                                        onClick={() => onView(patient.id)}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>

                                    <IconButton
                                        color="warning"
                                        onClick={() => onEdit(patient.id)}
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => onDelete(patient)}
                                    >
                                        <DeleteIcon />
                                        
                                    </IconButton>
                                    
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        
        </TableContainer>
    )
}
export default PatientTable;