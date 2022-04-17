
import { useEffect, useState } from 'react';
import './App.css';
import { getPeople } from './api/people';

function App() {
  const [people, setPeople] = useState([]);
  
  useEffect(() => {
    getPeople().then((data) => setPeople(data.results));
  },[])

  return (
    <ul>
    {people.map((character) => (
      <li key={character.name}>{character.name}</li>
    ))}
      </ul>
    
  );
}

export default App;
