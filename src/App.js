import { useEffect, useState } from "react";
import "./App.css";
import { getPeople } from "./api/people";

function App() {
  const [people, setPeople] = useState([]);
  const [errorState, setErrorState] = useState({ hasError: false });

  useEffect(() => {
    getPeople()
      .then((data) => setPeople(data.results))
      .catch(handleError);
  }, []);

  const handleError = (error) => {
    setErrorState({ hasError: true, message: error.message });
  };

  return (
    <ul>
      {errorState.hasError && <div>{errorState.message}</div>}

      {people.map((character) => (
        <li key={character.name}>{character.name}</li>
      ))}
    </ul>
  );
}

export default App;
