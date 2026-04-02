import { useExamplesContext } from '../hooks/useExamplesContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date-fns
import { formatDistanceToNow } from 'date-fns'

const ExampleDetails = ({ example }) => {
    const { dispatch } = useExamplesContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        
        const response = await fetch('/api/examples/' + example._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}` 
            }
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({ type: 'DELETE_EXAMPLE', payload: json })
        }
    }
 
  return (
    <div className="example-details">
      <h4>{example.name}</h4>
      <p><strong>name : </strong>{example.name}</p>
      <p><strong>value : </strong>{example.value}</p>
      <p>created {formatDistanceToNow(new Date(example.createdAt), { addSuffix: true })}</p>
      <span className="material-icons" onClick={handleClick}>delete</span>
    </div>
  )
}

export default ExampleDetails