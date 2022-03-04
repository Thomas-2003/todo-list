
import React, { useState, useEffect, useRef } from 'react'
function Userlist(props) {
    let inputRefs = []

    const setRef = (ref) => {
        inputRefs.push(ref);
    };
    const [edit, setEdit] = useState("")
    console.log(edit)
    const [title, setTitle] = useState("")
    return <ul className="list-group w-100">{props.stateNames.map(todo => (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span ref={setRef} contentEditable={edit === todo.id ? "true" : "false"} className="me-3">{todo.title}</span>
            <button className="btn btn-outline-info" onClick={(e) => {
                setEdit(todo.id)
                inputRefs[todo.id].focus();

            }}>E</button>
            <button className="btn btn-outline-danger" onClick={(e) => {
                const newStateNames = [...props.stateNames] // deepclone
                const positionInArray = newStateNames.findIndex(nameToSearch => nameToSearch.title === todo.title)
                const personDeleted = newStateNames.splice(positionInArray, 1)
                props.setStateNames(newStateNames)
            }}>X</button></li>
    ))}
    </ul>
}
export default Userlist