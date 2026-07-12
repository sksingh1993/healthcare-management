import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import PageHeader from "../../components/common/PageHeader";
import AppTextField from "../../components/common/AppTextField";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import { handleApiError } from "../../utils/apiErrorHandler";
import { initialLeave, leaveSearch } from "./leaveConstant";
import { deleteLeave, searchLeaves, searchLeavesForDoctors } from "../../services/leaveService";
import LeaveTable from "../../components/leave/LeaveTable";
import LeaveSearch from "../../components/leave/LeaveSearch";

export default function LeaveList() {

    const { doctorId } = useParams()
    console.log("URL:", window.location.pathname);
    console.log("doctorId:", doctorId);

    const navigate = useNavigate();

    const [leaves, setLeaves] = useState([]);

    const [page, setPage] = useState(0);

    const [size] = useState(5);

    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState(leaveSearch);


    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [selectedLeave, setSelectedLeave] = useState(null);

    useEffect(() => {
        setSearch(leaveSearch);
        setPage(0);
    }, [doctorId]);
    
    useEffect(() => {
        loadLeaves();
    }, [search, page, doctorId]);

    const loadLeaves = async () => {

        try {

            setLoading(true);

            if (doctorId) {
                const response = await searchLeavesForDoctors(doctorId, {
                    ...search,
                    page,
                    size,
                    sort: "fromDate,asc"
                });
                //console.log("Leave search in leave list")
                setLeaves(response.data.content);
                setTotalPages(response.data.totalPages);

            } else {
                const response = await searchLeaves({
                    ...search,
                    page,
                    size,
                    sort: "fromDate,asc"
                });
                //console.log("Leave search in leave list")
                setLeaves(response.data.content);
                setTotalPages(response.data.totalPages);
            }


        } catch (error) {
            //console.log("Exception in lieave search,",error)
            handleApiError(error);
        } finally {
            setLoading(false)
        }
    };

    const handleSearch = () => {
        setPage(0);
        loadLeaves();
    };
    const handleReset = () => {
        setSearch(leaveSearch);
        setPage(0);

        // setSearch(leaveSearch);
        // setPage(0);
        // loadLeaves(leaveSearch, 0);
        // console.log(search)

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
            console.log(leaves)
            setDeleteLoading(true);


            await deleteLeave(doctorId, selectedLeave.id);

            handleClose();

            setDeleteDialogOpen(false);

            loadLeaves();

        } catch (error) {


            handleApiError(error);

        } finally {

            setDeleteLoading(false);

        }

    };
    const handleClose = () => {

        setDeleteDialogOpen(false);

        setSelectedLeave(null);

        document.activeElement?.blur();

    };

    return (

        <div>
            {console.log("doctorId", doctorId)}

            <PageHeader
                title="Leave"
                actions={
                    doctorId ? (<Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            onClick={() => navigate(`/doctor/${doctorId}/leave/new`)}
                        >
                            Create Leave
                        </Button>

                    </Stack>) : null
                }
            />

            <LeaveSearch
                search={search}
                doctorId={doctorId}
                onChange={handleSearchChange}
                onSearch={handleSearch}
                onReset={handleReset}
            />

            <br />
            <LeaveTable
                leaves={leaves}
                doctorId={doctorId}
                onView={(id) => navigate(`/leave/${id}`)}
                onEdit={(doctorId, leaveId) => navigate(`/doctor/${doctorId}/leave/edit/${leaveId}`)}
                onDelete={(leave) => {

                    setSelectedLeave(leave);

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
                title="Delete Leave"
                message={`Are you sure you want to delete ${selectedLeave?.leaveType} leave of Dr. ${selectedLeave?.doctorName}?`}
                loading={deleteLoading}
                onCancel={handleClose}
                onConfirm={handleDelete}
            />

        </div>

    );
}

