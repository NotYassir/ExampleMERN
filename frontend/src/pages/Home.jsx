import { useEffect } from "react"
import { useExamplesContext } from "../hooks/useExamplesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ExampleDetails from "../components/ExampleDetails"
import ExampleForm from "../components/ExampleForm"

const Home = () => {
    const { examples, dispatch } = useExamplesContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchExamples = async () => {
            try {
                const response = await fetch('/api/examples', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const json = await response.json();
                dispatch({ type: 'SET_EXAMPLES', payload: json });
            } catch (error) {
                console.error('Error fetching example data:', error);
            }
        };

        fetchExamples();
    }, [dispatch, user]);
            
    return (
        <div className="home">
            <div className="examples">
                {examples && examples.map(example => (
                    <ExampleDetails key={example._id} example={example} />
                ))}
            </div>
            <ExampleForm />
        </div>
    )
}

export default Home