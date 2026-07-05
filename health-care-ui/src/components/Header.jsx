import { useAuth } from "../context/AuthContext";
import Clock from "./clock/Clock";

function Header() {

    const { user, logout } = useAuth();

    return (
        <header
            style={{
                height: "100px",
                background: "#1976d2",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 20px"
            }}>
            <h3>Health Care Management System</h3>
            <div className="clock-right">
                <Clock/>
            </div>
            
            <div style={{marginTop:"20px"}}>
                <span style={{ marginRight: "20px" }}>
                    Welcome {user?.fullName}
                </span>

                <button onClick={logout}>
                    Logout
                </button>
            </div>
        </header>
    );
}

export default Header;