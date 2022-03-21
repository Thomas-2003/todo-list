export const NavBar = (props) => {
    return (
        <nav class={`navbar navbar-expand  ${props.darkmode ? `navbar-dark bg-dark` : `navbar-light bg-light`}`}>
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Todo-list</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <form onSubmit={e => {
                        const payload = {
                            email: e.target.elements.email.value,
                            password: e.target.elements.password.value
                        }
                        fetch(`http://localhost:4000/users/auth`, {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(payload)
                        }).then(res => res.json())
                            .then(res => {
                                console.log(res)
                                if ("token" in res) {
                                    localStorage.setItem("token", res.token)
                                    alert("Successfully logged in")
                                } else {
                                    alert("wrong credentials")
                                }
                            })
                        e.preventDefault()
                    }} class="d-flex">
                        <input class="form-control me-2" defaultValue="test@example.com" type="email" name="email" placeholder="Email" aria-label="Email" />
                        <input class="form-control me-2" defaultValue="password123" type="password" name="password" placeholder="Password" aria-label="Password" />
                        <button class="btn btn-outline-success" type="submit">Login</button>
                    </form>
                    <button className={`btn ${props.darkmode ? `btn-dark` : `btn-light`}`} onClick={e => {
                        localStorage.removeItem("token")
                    }}>Logout</button>
                    <button className={`btn ${props.darkmode ? `btn-dark` : `btn-light`}`} onClick={e => {
                        props.setDarkmode(!props.darkmode)
                    }}>Darkmode</button>
                </div>
            </div>
        </nav>
    )
}