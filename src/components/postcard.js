// import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../store/url";

export function Postcard(props) {
    const token = localStorage.getItem("accessToken")

    function deletePost() {
        fetch(BASE_URL + `/posts/${props.id}`, {
            method: "delete",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            return response.json()
        })
            .then((data) => {
                if (data.statusCode === 403) {
                    alert("You are not the owner of this post, please rest!")
                }
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            })
    }
    return (
        <div>
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        {props.name} {props.created}
                    </p>
                    <button className="card-header-icon" aria-label="more options">
                        <span className="icon">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                    </button>
                </header>
                <div className="card-content">
                    <div className="content container">
                        {props.content}
                    </div>
                </div>
                <footer className="card-footer">
                    {/* <button href="#" className="card-footer-item">Save</button> */}
                    <button href="#" className="card-footer-item">Edit</button>
                    <button href="#" className="card-footer-item" onClick={props.id ? deletePost : 'cant delete'} to="/">Delete</button>
                </footer>
            </div>
        </div>
    )
}