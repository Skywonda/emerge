import { Link } from "react-router-dom";

export function Navbar() {
    return (
        <div className="navbar" aria-label="main navigation">
            <div className="navbar-start">
                <h1 className="navbar-item title">
                    Emerge
                </h1>
            </div>

            <div className="navbar-end">
                <div className="navbar-item">
                    <div className="buttons">
                        <Link className="button is-primary" to="/signup">Signup</Link>
                        <Link className="button is-light" to="/login">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}