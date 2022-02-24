function Userlist(props) {
    return <ul className="list-group">{props.stateNames.map(name => (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span className="me-3">{name}</span>
            <button className="btn btn-outline-danger" onClick={(e) => {
                const newStateNames = [...props.stateNames] // deepclone
                const positionInArray = newStateNames.findIndex(nameToSearch => nameToSearch === name)
                const personDeleted = newStateNames.splice(positionInArray, 1)
                props.setStateNames(newStateNames)
            }}>X</button></li>
    ))}
    </ul>
}
export default Userlist