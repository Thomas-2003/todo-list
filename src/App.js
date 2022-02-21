import React, { useState } from 'react'
import './App.css';

function App() {
  const names = ["Thomas", "Frank", "Tommy"] // nono-react pure javascript array
  const [stateNames, setStateNames] = useState(names) //define a getter variable and a setter method
  const [input, setInput] = useState("")

  function convert(input) {
    let output = "";
    for (var i = 0; i < input.length; i++) {
      output += input[i].charCodeAt(0).toString(2) + " ";
    }
    return output
  }

  return (
    <div className="App">
      <header className="App-header">
        Hey new user {input}!
        <input id="name" name="username" placeholder='Enter name' onChange={(e) => {
          const binaryString = convert(e.target.value)
          setInput(binaryString)
        }} />
        <button onClick={(e) => { // react has lots of build in event handlers
          const name = document.getElementById("name")
          const newStateNames = [...stateNames] // deepclone
          newStateNames.push(name.value)
          setStateNames(newStateNames)
        }}>Submit</button>
        <ul>
          {stateNames.map(name => (
            <li>{name} <button onClick={(e) => {
              const newStateNames = [...stateNames] // deepclone
              const positionInArray = newStateNames.findIndex(nameToSearch => nameToSearch === name)
              const personDeleted = newStateNames.splice(positionInArray, 1)
              console.log(personDeleted)
              setStateNames(newStateNames)
            }}>X</button></li>
          ))}
        </ul>

      </header>
    </div>
  );
}

export default App;
