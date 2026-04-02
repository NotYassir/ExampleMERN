import { ExamplesContext } from "../context/ExamplesContext"
import { useContext } from "react"

export const useExamplesContext = () => {
  const context = useContext(ExamplesContext)
  if(!context) {
    throw Error('useExamplesContext must be used inside an ExamplesContextProvider')
  }

  return context
}