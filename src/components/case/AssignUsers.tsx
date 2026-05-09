import React, { useEffect, useState } from "react";
import axios from "axios";

const AssignUsers = ({ caseId }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [role, setRole] = useState("CLIENT");

    useEffect(() => {
        axios.get("/api/users").then((res) => {
            setUsers(res.data);
        });
    }, []);

    const assign = async () => {
        await axios.post("/api/case-assign/assign", {
            caseId,
            userId: selectedUser,
            role,
        });

        alert("Assigned successfully");
    };

    return (
        <div>
            <h3>Assign User to Case</h3>

            <select onChange={(e) => setSelectedUser(e.target.value)}>
                <option>Select User</option>
                {users.map((u: any) => (
                    <option key={u.id} value={u.id}>
                        {u.email}
                    </option>
                ))}
            </select>

            <select onChange={(e) => setRole(e.target.value)}>
                <option value="ADVOCATE">Advocate</option>
                <option value="CLIENT">Client</option>
                <option value="LITIGENT">Litigent</option>
            </select>

            <button onClick={assign}>Assign</button>
        </div>
    );
};

export default AssignUsers;