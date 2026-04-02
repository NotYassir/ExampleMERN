import { useState } from 'react'
import { useExamplesContext } from '../hooks/useExamplesContext'
import { useAuthContext } from '../hooks/useAuthContext'

const ExampleForm = () => {
  const { dispatch } = useExamplesContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const example = {name, value}
    
    const response = await fetch('/api/examples', {
      method: 'POST',
      body: JSON.stringify(example),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setError(null)
      setName('')
      setValue('')
      setEmptyFields([])
      console.log('new example added:', json)
      dispatch({ type: 'CREATE_EXAMPLE', payload: json })
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Example</h3>

      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name}
        className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Value:</label>
      <input 
        type="number" 
        onChange={(e) => setValue(e.target.value)} 
        value={value}
        className={emptyFields.includes('value') ? 'error' : ''}
      />

      <button>Add Example</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ExampleForm