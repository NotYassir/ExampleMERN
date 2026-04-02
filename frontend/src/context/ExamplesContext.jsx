import { createContext, useReducer } from 'react'

export const ExamplesContext = createContext()

export const examplesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXAMPLES':
      return { 
        examples: action.payload 
      }
    case 'CREATE_EXAMPLE':
      return { 
        examples: [action.payload, ...state.examples] 
      }
    case 'DELETE_EXAMPLE':
      return {
        examples: state.examples.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const ExamplesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(examplesReducer, { 
    examples: null
  })
  
  return (
    <ExamplesContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ExamplesContext.Provider>
  )
}


export default ExamplesContextProvider