
import React, { useState, createRef } from 'react'
function Userlist(props) {
    const lineRefs = React.useRef([]);
    lineRefs.current = props.stateNames.map((_, i) => lineRefs.current[i] ?? createRef());
    const [edit, setEdit] = useState("")
    return <ul className={`list-group w-100`}>{props.stateNames.map((todo, index) => (
        <li key={index} className={`list-group-item d-flex justify-content-between align-items-center  ${props.darkmode ? `list-group-item-dark bg-dark text-white border-white` : ``} ${edit === index ? `ps-1` : ``}`}>

            <input ref={lineRefs.current[index]} className={`form-control ${props.darkmode ? `bg-dark text-light` : ``} ${edit === index ? `` : `d-none`}`} value={todo.title} />

            <span className={`me-3  ${edit === index ? `d-none` : ``}`}>{todo.title}</span>

            <div className='d-flex'>
                {edit === index ? (
                    <>
                        <button className="btn btn-outline-success" onClick={(e) => {
                            setEdit(index)
                        }}>S</button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-outline-info" onClick={(e) => {
                            setEdit(index)
                            setTimeout(() => {
                                lineRefs.current[index].current.focus();
                            }, 1);
                        }}>E</button>
                    </>
                )}
                <button className="btn btn-outline-danger" onClick={(e) => {
                    const newStateNames = [...props.stateNames] // deepclone
                    const positionInArray = newStateNames.findIndex(nameToSearch => nameToSearch.title === todo.title)
                    const personDeleted = newStateNames.splice(positionInArray, 1)
                    props.setStateNames(newStateNames)
                    //localStorage.setItem("todos", JSON.stringify(newStateNames))
                }}>X</button>
            </div>
        </li>
    ))}
    </ul>
}
export default Userlist