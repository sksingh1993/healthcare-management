import { Box, Button, Grid, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { deleteDoctor, searchDoctors } from "../../services/doctorService";
import PageHeader from "../../components/common/PageHeader";
import AppTextField from "../../components/common/AppTextField";
import DoctorTable from "../../components/doctor/DoctorTable";
import DoctorSearch from "../../components/doctor/DoctorSearch";
import { initialSearch } from "../../constants/initialSearch";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { handleApiError } from "../../utils/apiErrorHandler";

function DoctorList() {

    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);

    const [page, setPage] = useState(0);

    const [size] = useState(10);

    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState(initialSearch);
  

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {

        loadDoctors();

    }, []);

    useEffect(() => {
        loadDoctors();
    }, [page]);

    const loadDoctors = async () => {

        try {

            setLoading(true);

            const response = await searchDoctors({
                ...search,
                page,
                size,
                sort: "doctorCode,asc"
            });

            setDoctors(response.data.content);
            setTotalPages(response.data.totalPages);

        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false)
        }
    };

    const handleSearch = () => {
        setPage(0);
        loadDoctors();
    };
    const handleReset = () => {

        setSearch(initialSearch);

        setPage(0);

        loadDoctors(initialSearch, 0);

    };
    const handleSearchChange = (event) => {

        const { name, value } = event.target;
        console.log(event.target);
        setSearch(prev => ({
            ...prev,
            [name]: value
        }));

    };
    const handleDelete = async () => {

        try {

            setDeleteLoading(true);


            await deleteDoctor(selectedDoctor.id);

            handleClose();

            setDeleteDialogOpen(false);

            loadDoctors();

        } catch (error) {


            handleApiError(error);

        } finally {

            setDeleteLoading(false);

        }

    };
    const handleClose = () => {

    setDeleteDialogOpen(false);

    setSelectedDoctor(null);

    document.activeElement?.blur();

};

    return (

        <div>
            <PageHeader
                title="Doctors"
                buttonText="Add Doctor"
                onButtonClick={() => navigate("/doctor/new")}
            />

            <DoctorSearch
                search={search}
                onChange={handleSearchChange}
                onSearch={handleSearch}
                onReset={handleReset}
            />

            <br />
            <DoctorTable
                doctors={doctors}
                onView={(id) => navigate(`/doctor/${id}`)}
                onEdit={(id) => navigate(`/doctor/edit/${id}`)}
                onDelete={(doctor) => {

                    setSelectedDoctor(doctor);

                    setDeleteDialogOpen(true);

                }}
            />


            <br />

            {/* <button
                disabled={page === 0}
                onClick={() => setPage(page - 1)}
            >
                Previous
            </button> */}
            <Button variant="outlined" disabled={page === 0}
                onClick={() => setPage(page - 1)}>

                Previous

            </Button>

            <span style={{ margin: "10px" }}>
                Page {page + 1} of {totalPages}
            </span>

            {/* <button
                disabled={page + 1 >= totalPages}
                onClick={() => setPage(page + 1)}
            >
                Next
            </button> */}
            <Button variant="outlined" disabled={page + 1 >= totalPages}
                onClick={() => setPage(page + 1)}>

                Next

            </Button>
            <ConfirmDialog
                open={deleteDialogOpen}
                title="Delete Doctor"
                message={`Are you sure you want to delete Dr. ${selectedDoctor?.fullName}?`}
                loading={deleteLoading}
                onCancel={handleClose}
                onConfirm={handleDelete}
            />

        </div>

    );
}

export default DoctorList;