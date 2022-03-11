export const NavBar = (props) => {
    return (
        <nav class={`navbar navbar-expand  ${props.darkmode ? `navbar-dark bg-dark` : `navbar-light bg-light`}`}>
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <form class="d-flex">
                        <input class="form-control me-2" type="password" placeholder="Password" aria-label="Password" />
                        <button class="btn btn-outline-success" type="submit">Password</button>
                    </form>
                    <button className={`btn ${props.darkmode ? `btn-dark` : `btn-light`}`} onClick={e => {
                        props.setDarkmode(!props.darkmode)
                    }}>Darkmode</button>
                </div>
            </div>
        </nav>
    )
}