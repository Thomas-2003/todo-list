function Userlist(props) {
    return props.stateNames.map(name => (
        <li>{name} <button onClick={(e) => {
            const newStateNames = [...props.stateNames] // deepclone
            const positionInArray = newStateNames.findIndex(nameToSearch => nameToSearch === name)
            const personDeleted = newStateNames.splice(positionInArray, 1)
            props.setStateNames(newStateNames)
        }}>X</button></li>

    ))
}
export default Userlist