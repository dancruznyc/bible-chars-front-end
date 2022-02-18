import React, { useState, useEffect } from "react";
import "./App.css";
import CharacterCard from "./Components/CharacterCard/CharacterCard";
import InputForm from "./Components/InputForm/InputForm";

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    console.log("using effect");
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:5000/characters")
      .then((res) => res.json())
      .then((res) => setCharacters([...res]));
  }

  return (
    <div className="container">
      <h1>Bible Character Cards</h1>
      <InputForm getData={getData} />
      <div className="App">
        {characters.map((char) => (
          <CharacterCard character={char} key={char.id} getData={getData} />
        ))}
      </div>
    </div>
  );
}

export default App;
