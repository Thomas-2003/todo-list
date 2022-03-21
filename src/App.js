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
  const [loading, setloading] = useState(false)
  useEffect(() => { //one time effect, will not be affected by react re-renders
    let parameters = ``
    if (query) {
      parameters = query.sort === 'title' ? `?sort=title` : ``
    }
    if (query && query.filter) {
      parameters = query.filter === 'completed' ? `?filter=completed` : `?filter=uncompleted`

    }
    fetch(`http://localhost:4000/todos${parameters}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })  //async operation
      .then(response => response.json())
      .then(json => {
        if (json.message === "success" && json.todos.length > 0) {
          setStateNames(json.todos) //save response into state after it is finished
        } else {
          alert("You are not authenticated!")
          localStorage.removeItem("token")
        }
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
            setloading(true)
            fetch(`http://localhost:4000/todos/save`, {
              method: "POST",
              headers: {
                "Authorization": localStorage.getItem("token")
              }
            })  //async operation
              .then(response => response.json())
              .then(res => {
                setloading(false)
                if (res.message === "success") {
                  console.log("Save worked")
                } else {
                  console.log("Password wrong")
                }
              })
          }}>
            {!loading ? (
              <>
                Save
              </>
            ) : (
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            )}
          </button>

        </div>
        <Userlist darkmode={darkmode} stateNames={stateNames} setStateNames={setStateNames} />

      </header>
    </div>
  );
}

export default App;
