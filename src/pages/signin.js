import { useState } from "react"
import { Navbar } from "../components/navbar"
import "./sign.css"
import { useNavigate } from "react-router-dom"

export function Signin() {

    const [identity, setIdentity] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const navigate = useNavigate()

    function handleLogin() {
        if (identity === "" || password === "") {
            setSuccess("")
            setError("Enter all fields")
        }
        fetch('https://devemerge.herokuapp.com/auth/login', {
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                identity,
                password
            })
        })
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data && data.statusCode === 401) {
                    setSuccess("")
                    setError("Baba se you don forget your credentials ni?")
                }
                if (data.accessToken) {
                    setError("")
                    setSuccess("sha enter, buh no go do anyhow, i gat eyes on you!!!")
                    localStorage.setItem("accessToken", data.accessToken)
                    setTimeout(() => {
                        navigate('/')
                    }, 3000);
                }
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
                    <input className="input" type="text" placeholder="Email or username" onChange={(e) => setIdentity(e.target.value)}></input>
                </div>
                <div className="control">
                    <input className="input" type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className="control">
                    <button className="button is-primary" onClick={handleLogin}>Submit</button>
                </div>
            </div>
        </div>
    )
}