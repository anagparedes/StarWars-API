
import './App.css';
import data from "./data.json";

function App() {
  return (
    <ul>
    {data.results.map((character) => (
      <li key={character.name}>{character.name}</li>
    ))}
      </ul>
    
  );
}

export default App;
