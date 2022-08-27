import { DeletePost } from "../store/homeContext"

export function Postcard(props) {
    return (
        <div>
            <div className="card mb-2">
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
                    {/* <a href="#" className="card-footer-item">Save</a> */}
                    {/* <a href="#" className="card-footer-item">Edit</a> */}
                    <button href="#" className="card-footer-item" onClick={() => DeletePost(props.id)} to="/">Delete</button>
                </footer>
            </div>
        </div>
    )
}