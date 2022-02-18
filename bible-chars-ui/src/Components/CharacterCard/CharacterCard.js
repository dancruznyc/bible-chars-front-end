import React, { useState, useEffect } from "react";
// import { updateCharacter } from "../../../../../bible-chars-db/queries";
import "./CharacterCard.css";

export default function CharacterCard(props) {
  const char = props.character;
  const [editMode, setEditMode] = useState(0);
  const [updatedChar, setUpdatedChar] = useState({});
  console.log(char);
  function deleteChar(id) {
    console.log(id);
    fetch(`http://localhost:5000/character/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => props.getData());
  }

  function updateCharInfo(char, e) {
    setUpdatedChar({
      ...char,
      [e.target.getAttribute("field")]: e.target.value,
    });
    console.log("My updated character", updatedChar);
  }

  function updateCharCard(char) {
    console.log("my updated char", updatedChar);
    fetch(`http://localhost:5000/characters`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedChar),
    })
      .then((res) => res.json())
      .then(() => props.getData());
    setEditMode(null);
  }

  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img src={`${char.image}`} alt="Avatar" />
        </div>
        {editMode === char.id ? (
          <div className="flip-card-back">
            <div className="update-form" key={char.id}>
              <input
                defaultValue={char.name}
                field="name"
                type="text"
                onChange={(e) => updateCharInfo(char, e)}
              />
              <input
                defaultValue={char.time}
                field="time"
                type="text"
                onChange={(e) => updateCharInfo(char, e)}
              />
              <input
                defaultValue={char.image}
                field="image"
                type="text"
                onChange={(e) => updateCharInfo(char, e)}
              />
              <textarea
                defaultValue={char.lessons}
                field="lessons"
                onChange={(e) => updateCharInfo(char, e)}
              />
              <button onClick={() => updateCharCard(char)}>Update</button>
              <button onClick={() => setEditMode(null)}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flip-card-back">
            <h2>Name:{char.name}</h2>
            <h2>Time Lived: {char.time}</h2>
            <p>{char.lessons}</p>
            <div>
              <button
                onClick={(e) => {
                  setEditMode(char.id);
                  console.log(editMode);
                }}
              >
                Edit
              </button>
              <button onClick={() => deleteChar(char.id)}>Delete</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
