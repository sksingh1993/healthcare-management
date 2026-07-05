import { useAuth } from "../../context/AuthContext";

function Dashboard() {

    const { user } = useAuth();

    return (
        <div>
        
            <h2>Dashboard</h2>

            <h3>Welcome {user.fullName}</h3>

            <p>Username : {user.userName}</p>

            <p>Roles : {user.roles.join(", ")}</p>

        </div>

      

    );
}

export default Dashboard;