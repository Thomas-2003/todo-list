import React, { useState, useEffect } from 'react'
import './App.css';
import Userlist from './Userlist';
import { NavBar } from './NavBar';

function App() {
  // const names = JSON.parse(localStorage.getItem("todos")) || [] // nono-react pure javascript array
  const names = [] // nono-react pure javascript array

  const [stateNames, setStateNames] = useState(names) //define a getter variable and a setter method
  const [input, setInput] = useState("")
  const [error, setError] = useState(undefined)
  const [darkmode, setDarkmode] = useState(false)
  const [query, setQuery] = useState(undefined)
  const [password, setpassword] = useState("")
  useEffect(() => { //one time effect, will not be affected by react re-renders
    let parameters = ``
    if (query) {
      parameters = query.sort === 'title' ? `?sort=title` : ``
    }
    if (query && query.filter) {
      parameters = query.filter === 'completed' ? `?filter=completed` : `?filter=uncompleted`

    }
    fetch(`http://localhost:4000/todos${parameters}`)  //async operation
      .then(response => response.json())
      .then(json => {
        setStateNames(json) //save response into state after it is finished
      })
  }, [query])

  return (
    <div className={`App ${darkmode ? `bg-dark text-light` : ``}`}>
      <NavBar setDarkmode={setDarkmode} darkmode={darkmode} />


      <header className="App-header container">
        Add to list {input}!
        <div className="input-group my-3">
          <input className={`form-control ${darkmode ? `bg-dark` : ``}`} value={input} id="name" name="username" placeholder='Enter name' onChange={(e) => {
            setInput(e.target.value)
            if (e.target.value.length > 1) {
              setError(undefined)
            } else {
              setError("Name too short")
            }
          }} />

          <button className="btn btn-primary ms-2" x>Submit</button>
        </div>
        {error !== undefined ? (
          <div className="mb-3 alert alert-danger" role="alert">
            {error}
          </div>

        ) : null}
        <div className="btn-group mb-3" role="group" aria-label="Basic example">
          <button className="btn btn-primary" onClick={e => {
            setQuery({ sort: "title" })
          }}>Sort</button>
          <button className="btn btn-primary" onClick={e => {
            setQuery({ filter: "completed" })
          }}>Done</button>
          <button className="btn btn-primary" onClick={e => {
            setQuery({ filter: "uncompleted" })
          }}>Not done</button>
          <button className="btn btn-primary" onClick={e => {
            setQuery(undefined)
          }}>Reset</button>
          <button className="btn btn-primary" onClick={e => {
            fetch(`http://localhost:4000/todos/save`, {
              method: "POST"
            })  //async operation
              .then(response => response.json())
              .then(json => {
                console.log(json)
              })
          }}>Save</button>
        </div>
        <Userlist darkmode={darkmode} stateNames={stateNames} setStateNames={setStateNames} />

      </header>
    </div>
  );
}

export default App;
