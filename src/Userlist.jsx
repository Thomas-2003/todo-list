
import React, { useState, useEffect, useMemo, useRef } from 'react'
function Userlist(props) {
    const inputRefs = useRef([]);



    const [edit, setEdit] = useState("")
    const [title, setTitle] = useState("")
    // inputRefs.current = props.stateNames.map((element, i) => inputRefs.current[i] ?? createRef());
    const refsById = {}
    props.stateNames.forEach((item, index) => {
        refsById[index] = React.createRef(null)
    })
    return <ul className="list-group w-100">{props.stateNames.map((todo, index) => (
        <li key={index} className={`list-group-item d-flex justify-content-between align-items-center ${edit === index ? `ps-1` : ``}`}>
            {edit === index ? (
                <>
                    <input ref={refsById[index]} className="form-control" onChange={e => {
                        console.log(e)
                    }} value={todo.title} />
                </>
            ) : (
                <>
                    <span className="me-3">{todo.title}</span>
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
                            console.log(refsById[index])
                            // inputRefs.current[index].current.focus();
                        }}>E</button>
                    </>
                )}
                <button className="btn btn-outline-danger" onClick={(e) => {
                    const newStateNames = [...props.stateNames] // deepclone
                    const positionInArray = newStateNames.findIndex(nameToSearch => nameToSearch.title === todo.title)
                    const personDeleted = newStateNames.splice(positionInArray, 1)
                    props.setStateNames(newStateNames)
                    localStorage.setItem("todos", JSON.stringify(newStateNames))
                }}>X</button>
            </div>
        </li>
    ))}
    </ul>
}
export default Userlist