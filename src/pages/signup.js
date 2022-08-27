import { useState } from "react"
import { Navbar } from "../components/navbar"
import "./sign.css"
import { useNavigate } from "react-router-dom";


export function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const navigate = useNavigate()

    function handleSubmit() {
        if (username === "" || email === "" || password === "") {
            setError("Enter all fields")
        }
        fetch('https://devemerge.herokuapp.com/users', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.error === "Conflict") {
                    setSuccess("")
                    setError("This user already exist")
                }
                else if (data.statusCode === 400) {
                    setError("Enter a valid details")
                }
                setError("")
                setSuccess("Baba oya pass, gettat of here and login!")
                setTimeout(() => {
                    navigate('/login')
                }, 3000);
            })
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-6">
                <div className="error">
                    <p>{error}</p>
                </div>
                <div className="success">
                    <p>{success}</p>
                </div>
                <div className="control">
                    <input className="input" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className="control">
                    <input className="input" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className="control">
                    <input className="input" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="control">
                    <button className="button is-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}