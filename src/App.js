import React, { useState, useEffect } from 'react'
import './App.css';
import Userlist from './Userlist';

function App() {
  const names = ["Thomas", "Frank", "Tommy"] // nono-react pure javascript array
  const [stateNames, setStateNames] = useState(names) //define a getter variable and a setter method
  const [input, setInput] = useState("")
  const [error, setError] = useState(undefined)

  function convert(input) {
    let output = "";
    for (var i = 0; i < input.length; i++) {
      output += input[i].charCodeAt(0).toString(2) + " ";
    }
    return output
  }
  useEffect(() => { //one time effect, will not be affected by react re-renders
    fetch('https://jsonplaceholder.typicode.com/todos')  //async operation
      .then(response => response.json())
      .then(json => {
        setStateNames(json) //save response into state after it is finished
      })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        Hey new user {input}!
        <div class="input-group my-3">
          <input className='form-control' value={input} id="name" name="username" placeholder='Enter name' onChange={(e) => {
            const binaryString = convert(e.target.value)
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
            newStateNames.push(name.value)
            setStateNames(newStateNames)
          }}>Submit</button>
        </div>
        {error !== undefined ? (
          <div class="mb-3 alert alert-danger" role="alert">
            {error}
          </div>

        ) : null}
        <Userlist stateNames={stateNames} setStateNames={setStateNames} />

      </header>
    </div>
  );
}

export default App;
