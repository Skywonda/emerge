import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Postcard } from "./postcard"


export function Dashboard() {

    const token = localStorage.getItem('accessToken')
    const options = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            "authorization": `Bearer ${token}`
        }
    }

    const navigate = useNavigate()

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [name, setName] = useState("")
    const [userId, setUserId] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)
    const [post, setPost] = useState("")


    useEffect(() => {
        fetch('https://devemerge.herokuapp.com/posts', options)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setPosts(data)
                setLoggedIn(true)
                setLoading(false)
            })
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        fetch('https://devemerge.herokuapp.com/users/me', options)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setName(data.username)
                setUserId(data.id)
            })
        // eslint-disable-next-line
    }, [])

    function handlePost() {
        fetch('https://devemerge.herokuapp.com/posts', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                authorId: userId,
                content: post
            })
        })
            .then((response) => {
                window.location.reload()
                return response.json()
            })
    }

    function handleLogout() {
        localStorage.clear()
        setLoggedIn(false)
        navigate('/login')

    }

    if (!loading) {
        !loggedIn && navigate('/login')
    }

    return (
        <section>
            <section className="hero is-dark">
                <div className="hero-body container">
                    <h2 className="title is-size-1"> Welcome, {name} </h2>

                </div>
                <div>
                    <textarea className="textarea" placeholder="Write Something" onChange={(e) => setPost(e.target.value)}></textarea>
                    <button className="button is-light" onClick={handlePost}>Post</button>
                </div>
                {posts.map((post) => (
                    <Postcard
                        id={post.id}
                        name={post.author.username}
                        content={post.content}
                        key={post.id}
                        created={post.create_at}
                    />
                ))
                }
            </section>
            <button className="button is-danger is-light" onClick={handleLogout}>Logout</button>
        </section>
    )


}