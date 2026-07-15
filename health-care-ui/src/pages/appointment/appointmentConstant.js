
export const initialAppointment = {

    patientId: "",

    doctorId: "",

    appointmentDate: "",

    appointmentTime: "",

    appointmentType: "",

    reason: "",

    remarks: ""

};

export const initialAppointmentSearch = {

    patientId: "",

    doctorId: "",

    status: "",

    fromDate: "",

    toDate: ""

};





// const appointment = {
//     ...initialAppointment,
//     doctorId: doctorId
// };

// const appointment = {
//     ...initialAppointment,
//     doctorId
// };
// //in react
// const [appointment, setAppointment] = useState(initialAppointment);
// //Then update only doctorId:

// setAppointment(prev => ({
//     ...prev,
//     doctorId
// }));

// navigate(`/doctor/${doctorId}/appointment/new`);

// const { doctorId } = useParams();

// const [appointment, setAppointment] = useState({
//     ...initialAppointment,
//     doctorId
// });