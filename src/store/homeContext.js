
export function DeletePost(props) {

    const token = localStorage.getItem('accessToken')
    fetch(`http://localhost:8000/posts/${props.id}`, {
        method: "delete",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then((response) => {
            return response.json()
        })
}