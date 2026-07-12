

import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


import PageHeader from "../../components/common/PageHeader";
import AppTextField from "../../components/common/AppTextField";

import ConfirmDialog from "../../components/common/ConfirmDialog";
import { handleApiError } from "../../utils/apiErrorHandler";
import { scheduleSearch } from "./scheduleConstant";
import { deleteSchedule, searchSchedules, searchSchedulesForDoctors } from "../../services/scheduleService";
import ScheduleTable from "../../components/schedule/ScheduleTable";
import ScheduleSearch from "../../components/schedule/ScheduleSearch";
import { searchLeavesForDoctors } from "../../services/leaveService";


export default function ScheduleList() {

    const { doctorId } = useParams()

    const navigate = useNavigate();

    const [schedules, setSchedules] = useState([]);

    const [page, setPage] = useState(0);

    const [size] = useState(5);

    const [totalPages, setTotalPages] = useState(0);

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState(scheduleSearch);


    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);

    useEffect(() => {
        //console.log("Leave for doctor id : ",doctorId);

        loadSchedules();

    }, []);

    useEffect(() => {
        loadSchedules();
    }, [search, page]);

    const loadSchedules = async () => {

        try {

            setLoading(true);
            if (doctorId) {
                console.log("Doctor id is present");
                const response = await searchSchedulesForDoctors(doctorId, {
                    ...search,
                    page,
                    size,
                    sort: "dayOfWeek,asc"
                });
                setSchedules(response.data.content);
                setTotalPages(response.data.totalPages);
            } else {
                console.log("Doctor id not present");
                const response = await searchSchedules({
                    ...search,
                    page,
                    size,
                    sort: "dayOfWeek,asc"
                });
                setSchedules(response.data.content);
                setTotalPages(response.data.totalPages);
            }
            //console.log("Leave search in leave list")
            setSchedules(response.data.content);
            setTotalPages(response.data.totalPages);

        } catch (error) {
            //console.log("Exception in lieave search,",error)
            handleApiError(error);
        } finally {
            setLoading(false)
        }
    };

    const handleSearch = () => {
        setPage(0);
        loadSchedules();
    };
    const handleReset = () => {

        setSearch(scheduleSearch);

        setPage(0);

        loadSchedules(scheduleSearch, 0);
        console.log(search)

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
            console.log("Selected Schedule :", selectedSchedule.id);

            await deleteSchedule(doctorId, selectedSchedule.id);

            handleClose();

            setDeleteDialogOpen(false);

            loadSchedules();

        } catch (error) {


            handleApiError(error);

        } finally {

            setDeleteLoading(false);

        }

    };
    const handleClose = () => {

        setDeleteDialogOpen(false);

        setSelectedSchedule(null);

        document.activeElement?.blur();

    };
    //console.log("Schedule List :",schedules)
    return (

        <div>

            <PageHeader
                title="Schedule"
                actions={
                    doctorId ? (<Stack direction="row" spacing={1}>
                        <Button
                            variant="contained"
                            onClick={() => navigate(`/doctor/${doctorId}/schedule/new`)}
                        >
                            Create Schedule
                        </Button>

                    </Stack>):null
                }
            />

            <ScheduleSearch
                search={search}
                doctorId={doctorId}
                onChange={handleSearchChange}
                onSearch={handleSearch}
                onReset={handleReset}
            />

            <br />
            <ScheduleTable
                schedules={schedules}
                doctorId={doctorId}
                onView={(id) => navigate(`/leave/${id}`)}
                onEdit={(doctorId, scheduleId) => navigate(`/doctor/${doctorId}/schedule/edit/${scheduleId}`)}
                onDelete={(schedule) => {

                    setSelectedSchedule(schedule);

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
                message={`Are you sure you want to delete schedile between ${selectedSchedule?.startTime} to ${selectedSchedule?.endTime} of week day ${selectedSchedule?.dayOfWeek} of Dr. ${selectedSchedule?.doctorName}?`}
                loading={deleteLoading}
                onCancel={handleClose}
                onConfirm={handleDelete}
            />

        </div>

    );
}

