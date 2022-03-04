
import React, { useState, useEffect, useRef } from 'react'
function Userlist(props) {
    let inputRefs = []

    const setRef = (ref) => {
        inputRefs.push(ref);
    };
    const [edit, setEdit] = useState("")
    const [title, setTitle] = useState("")
    console.log(edit)
    return <ul className="list-group w-100">{props.stateNames.map((todo, index) => (
        <li className={`list-group-item d-flex justify-content-between align-items-center ${edit === index ? `ps-1` : ``}`}>
            {edit === index ? (
                <>
                    <input className="form-control" value={todo.title} />
                </>
            ) : (
                <>
                    <span ref={setRef} className="me-3">{todo.title}</span>
                </>
            )}
            <div className='d-flex'>
                {edit === index ? (
                    <>
                        <button className="btn btn-outline-success" onClick={(e) => {
                            setEdit(index)
                            //  inputRefs[todo.id].focus();
                        }}>S</button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-outline-info" onClick={(e) => {
                            setEdit(index)
                            //  inputRefs[todo.id].focus();
                        }}>E</button>
                    </>
                )}
                <button className="btn btn-outline-danger" onClick={(e) => {
                    const newStateNames = [...props.stateNames] // deepclone
                    const positionInArray = newStateNames.findIndex(nameToSearch => nameToSearch.title === todo.title)
                    const personDeleted = newStateNames.splice(positionInArray, 1)
                    props.setStateNames(newStateNames)
                }}>X</button>
            </div>
        </li>
    ))}
    </ul>
}
export default Userlist