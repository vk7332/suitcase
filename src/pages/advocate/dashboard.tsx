import { Link } from "react-router-dom";

export default function AdvocateDashboard() {
    return (
        <div>

            <h1>Advocate Dashboard</h1>

            <ul>
                <li><Link to="/advocate/clients">Clients</Link></li>
                <li><Link to="/advocate/cases">Cases</Link></li>
                <li><Link to="/advocate/fees">Fees</Link></li>
            </ul>

        </div>
    );
}
