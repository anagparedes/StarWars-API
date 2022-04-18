import { useEffect, useState, useRef } from "react";
import "./App.css";
import { getCharacter, getPeople, searchCharacter } from "./api/people";

function App() {
  const inputSearch = useRef(null);
  const [people, setPeople] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [currentCharacter, setCurrentCharacter] = useState(1);
  const [page, setPage] = useState(1);
  const [details, setDetails] = useState({});
  const [errorState, setErrorState] = useState({ hasError: false });

  useEffect(() => {
    getPeople(page)
      .then(setPeople)
      .catch(handleError);
  }, [page]);

  useEffect(() => {
  getCharacter(currentCharacter).then((setDetails)).catch(handleError);
  }, [currentCharacter]);


  const handleError = (error) => {
    setErrorState({ hasError: true, message: error.message });
  };

  const showDetails = (character) => {
    const id = Number(character.url.split("/").slice(-2)[0]);
    setCurrentCharacter(id);
  }
  const onChangeTextSearch = event => {
    event.preventDefault();
    const text = inputSearch.current.value;
    setTextSearch(text);
  }
  const onSearchSubmit = event => {
    if(event.key !== "Enter") return "";
    inputSearch.current.value = "";
    setDetails({});
    searchCharacter(textSearch)
    .then(setPeople)
    .catch(handleError);
  };

  const onChangePage = next => {
   if(!people.previous && page + next <= 0) return;
   if(!people.next && page + next >= 9) return;
   setPage(page + next);
  }

  return (
    <div>
      <input
        ref={inputSearch}
        onChange={onChangeTextSearch}
        onKeyDown={onSearchSubmit}
        type="text"
        placeholder="Write the name of the character"
      />
  <section>
    <button onClick={ () => onChangePage(-1)}>Prev</button>| {page} |
    <button onClick={() => onChangePage(1)}>Next</button>
  </section>

      <ul>
        {errorState.hasError && <div>{errorState.message}</div>}

        {people?.results?.map((character) => (
          <li key={character.name} onClick={() => showDetails(character)}>
            {character.name}
          </li>
        ))}
      </ul>
      {details && (
        <aside>
          <h1>{details.name}</h1>
          <ul>
            <li>birthday: {details.birth_year}</li>
            <li>gender: {details.gender}</li>
            <li>Hair color: {details.hair_color}</li>
          </ul>
        </aside>
      )}
    </div>
  );
}

export default App;
