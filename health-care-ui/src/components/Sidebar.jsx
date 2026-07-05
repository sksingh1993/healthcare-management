import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {

    const { user } = useAuth();

    return (
        <aside
            style={{
                width: "220px",
                background: "#f4f4f4",
                padding: "20px",
                minHeight: "calc(100vh - 60px)"
            }}
        >
            <ul style={{ listStyle: "none", padding: 0 }}>

                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>

                <li>
                    <Link to="/doctor">Doctors</Link>
                </li>

                <li>
                    <Link to="/patient">Patients</Link>
                </li>

                {user?.roles.includes("ADMIN") && (
                    <li>
                        <Link to="/staff">Staff</Link>
                    </li>
                )}

                <li>
                    <Link to="/appointment">Appointments</Link>
                </li>

                <li>
                    <Link to="/schedule">Schedules</Link>
                </li>

                <li>
                    <Link to="/leave">Leaves</Link>
                </li>

            </ul>
        </aside>
    );
}

export default Sidebar;