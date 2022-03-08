import React, { useState, useEffect } from 'react'
import './App.css';
import Userlist from './Userlist';

function App() {
  const names = JSON.parse(localStorage.getItem("todos")) || [] // nono-react pure javascript array

  const [stateNames, setStateNames] = useState(names) //define a getter variable and a setter method
  const [input, setInput] = useState("")
  const [error, setError] = useState(undefined)
  const [darkmode, setDarkmode] = useState(false)

  // useEffect(() => { //one time effect, will not be affected by react re-renders
  //   fetch('https://jsonplaceholder.typicode.com/todos')  //async operation
  //     .then(response => response.json())
  //     .then(json => {
  //       setStateNames(json) //save response into state after it is finished
  //     })
  // }, [])
  console.log(darkmode);
  return (
    <div className={`App ${darkmode ? `bg-dark text-light` : ``}`}>
      <button className={`btn ${darkmode ? `btn-dark` : `btn-light`}`} onClick={e => {
        setDarkmode(!darkmode)
      }}>Darkmode</button>
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

          <button className="btn btn-primary ms-2" onClick={(e) => { // react has lots of build in event handlers
            const name = document.getElementById("name")
            const newStateNames = [...stateNames] // deepclone
            newStateNames.push({ title: name.value })
            setStateNames(newStateNames)
            localStorage.setItem("todos", JSON.stringify(newStateNames))
            setInput("")
          }}>Submit</button>
        </div>
        {error !== undefined ? (
          <div class="mb-3 alert alert-danger" role="alert">
            {error}
          </div>

        ) : null}
        <Userlist darkmode={darkmode} stateNames={stateNames} setStateNames={setStateNames} />

      </header>
    </div>
  );
}

export default App;
