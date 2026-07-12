import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import PageHeader from "../../components/common/PageHeader";
import AppTextField from "../../components/common/AppTextField";


import { initialSearch } from "../../constants/initialSearch";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { handleApiError } from "../../utils/apiErrorHandler";
import StaffSearch from "../../components/staff/StaffSearch";

import { searchStaffs } from "../../services/staffService";
import StaffTable from "../../components/staff/StaffTable";
import { staffSearch } from "./staffConstants";

export default function StaffList() {

    const navigate = useNavigate();

    const [staffs, setStaffs] = useState([]);

    const [page, setPage] = useState(0);

    const [size] = useState(5);

    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState(staffSearch);


    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);

    useEffect(() => {

        loadStaffs();

    }, []);

    useEffect(() => {
        loadStaffs();
    }, [search,page]);

    const loadStaffs = async () => {

        try {

            setLoading(true);


            const response = await searchStaffs({
                ...search,
                page,
                size,
                sort: "employeeCode,asc"
            });

            setStaffs(response.data.content);
            setTotalPages(response.data.totalPages);

        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false)
        }
    };

    const handleSearch = () => {
        setPage(0);
        loadStaffs();
    };
    const handleReset = () => {

        setSearch(staffSearch);

        setPage(0);

        loadStaffs(staffSearch, 0);

    };
    const handleSearchChange = (event) => {

        const { name, value } = event.target;
        setPage(0);
        console.log(event.target);
        setSearch(prev => ({
            ...prev,
            [name]: value
        }));

    };
    const handleDelete = async () => {

        try {

            setDeleteLoading(true);


            await deleteStaff(selectedStaff.id);

            handleClose();

            setDeleteDialogOpen(false);

            loadStaffs();

        } catch (error) {


            handleApiError(error);

        } finally {

            setDeleteLoading(false);

        }

    };
    const handleClose = () => {

        setDeleteDialogOpen(false);

        setSelectedStaff(null);

        document.activeElement?.blur();

    };

    return (

        <div>


            <PageHeader
                title="Staffs"
                actions={
                    <Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            onClick={() => navigate("/staff/new")}
                        >
                            Add Employee
                        </Button>

                    </Stack>
                }
            />

            <StaffSearch
                search={search}
                onChange={handleSearchChange}
                onSearch={handleSearch}
                onReset={handleReset}
            />

            <br />
            <StaffTable
                staffs={staffs}
                onView={(id) => navigate(`/staff/${id}`)}
                onEdit={(id) => navigate(`/staff/edit/${id}`)}
                onDelete={(staff) => {

                    setSelectedStaff(staff);

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
                title="Delete Staff"
                message={`Are you sure you want to delete ${selectedStaff?.fullName}?`}
                loading={deleteLoading}
                onCancel={handleClose}
                onConfirm={handleDelete}
            />

        </div>

    );
}

