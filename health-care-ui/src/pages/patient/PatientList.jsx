import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import PatientSearch from "../../components/patient/PatientSearch";
import { useEffect, useState } from "react";
import { patientInitialSearch } from "./patientConstants";
import { deletePatient, searchPatient } from "../../services/patientService";
import PatientTable from "../../components/patient/PatientTable";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { handleApiError } from "../../utils/apiErrorHandler";
import { Button, Stack } from "@mui/material";

function PatientList() {
    const navigate = useNavigate();
    const [search, setSearch] = useState(patientInitialSearch);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [size, setSize] = useState(10);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadPatients();
    }, [])
    useEffect(() => {
        loadPatients();
    }, [search,page]);
    const loadPatients = async () => {
        try {
            setLoading(true);
            const response = await searchPatient(
                {
                    ...search,
                    page,
                    size,
                    sort: "patientCode,asc"
                }
            );
            console.log(response.data.content);
            setPatients(response.data.content)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false)
        }



    }

    const handleSearch = () => {
        console.log("Handle Change")
        setPage(0);
        loadPatients();
    }

    const handleSearchChange = (event) => {
        console.log("Handle Search")
        const { name, value } = event.target;
        setPage(0);
        console.log(event.target.value)
        setSearch(prev => ({
            ...prev,
            [name]: value
        }
        ))
    }

    const handleReset = () => {

        setSearch(patientInitialSearch);

        setPage(0);

        loadPatients(patientInitialSearch, 0);

    };
    const handleClose = () => {

        setDeleteDialogOpen(false);

        setSelectedPatient(null);

        document.activeElement?.blur();

    };
    const handleDelete = async () => {

        try {

            setDeleteLoading(true);


            await deletePatient(selectedPatient.id);

            handleClose();

            setDeleteDialogOpen(false);

            loadPatients();

        } catch (error) {


            handleApiError(error);


        } finally {

            setDeleteLoading(false);


        }

    };
    return (
        <div>
            
            <PageHeader
                title="Doctors"
                actions={
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/patient/new")}
                        >
                            Add Patient
                        </Button>

                    </Stack>
                }
            />

            <PatientSearch
                search={search}
                onChange={handleSearchChange}
                onSearch={handleSearch}
                onReset={handleReset}
            />
            <br />
            <PatientTable
                patients={patients}
                onView={(id) => navigate(`/patient/${id}`)}
                onEdit={(id) => navigate(`/patient/edit/${id}`)}
                onDelete={(patient) => {
                    setSelectedPatient(patient);
                    setDeleteDialogOpen(true);
                }}
            />
            <br />
            <Button variant="outlined" disabled={page === 0}
                onClick={() => setPage(page - 1)}>
                Previous
            </Button>
            <span style={{ margin: "10px" }}>
                Page {page + 1} of {totalPages}
            </span>
            <Button variant="outlined" disabled={page + 1 >= totalPages}
                onClick={() => setPage(page + 1)}>
                Next
            </Button>

            <ConfirmDialog
                open={deleteDialogOpen}
                title="Delete Patient"
                message={`Are you sure you want to delete . ${selectedPatient?.fullName}?`}
                loading={deleteLoading}
                onCancel={handleClose}
                onConfirm={handleDelete}
            />


        </div>
    )

}

export default PatientList;