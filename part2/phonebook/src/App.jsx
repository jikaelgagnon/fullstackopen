import axios from 'axios'
import { useEffect, useState } from 'react'
import personService from './services/persons'

const Filter = ({newFilter, handleFilterChange}) => {
  return(  <div>
    filter shown with <input 
    value={newFilter}
    onChange={handleFilterChange}
    />
    </div>)
}

const PersonForm = (props) => {
  return (  
  <form onSubmit={props.handleSubmit}>
  <div>
    name: 
    <input 
    value={props.newName}
    onChange={props.handleNameChange}
    />
  </div>
  <div>
    number: 
    <input 
    value={props.newNumber}
    onChange={props.handleNumberChange}
    />
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>)
}

const Persons = ({personsToShow, handleClick}) => {
  return(
    <ul>
    {personsToShow.map(person => 
    <li key={person.id}> {person.name} {person.number} <button id={person.id} onClick={handleClick}>delete</button> </li>)
    }
  </ul>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const entry = persons.filter(person => person.name === newName)[0]
    
    if (entry && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
      const newPerson = {...entry, number: newNumber}
      personService
        .update(newPerson.id, newPerson)
        .then(setPersons(persons.map(person => person.id !== newPerson.id ? person : newPerson)))
      return
    }
    const newPerson = {name: newName, number: newNumber}
    personService
    .create(newPerson)
    .then(response => {
      setPersons(persons.concat(response))
    })
  }

  const personsToShow = (newFilter === '') ? persons : persons.filter(person => person.name.toLowerCase().includes(newFilter))

  const handleFilterChange = (event) => {setNewFilter(event.target.value)}

  const hook = () => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }

  useEffect(hook, [])

  const handleDelete = (event) => {
    const id = event.target.id
    const personToDelete = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)){
      personService
      .deletePerson(id)
      .then(() => setPersons(persons.filter(person => person !== personToDelete)))
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
      handleSubmit={handleSubmit} 
      newName={newName} handleNameChange={handleNameChange}
      newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleClick={handleDelete}/>
    </div>
  )
}

export default App