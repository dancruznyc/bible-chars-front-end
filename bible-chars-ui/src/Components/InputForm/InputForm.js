import React, { useState, useEffect } from "react";
import "./InputForm.css";

export default function InputForm(props) {
  const [newChar, setNewChar] = useState({
    name: "",
    time: "",
    lessons: "",
    image: "",
  });
  function addChar() {
    console.log(newChar);
    fetch("http://localhost:5000/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChar),
    })
      .then((res) => res.json())
      .then((res) => props.getData());
  }
  return (
    <div className="input-form">
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setNewChar({ ...newChar, name: e.target.value })}
        value={newChar.name}
      ></input>
      <input
        type="text"
        placeholder="time"
        onChange={(e) => setNewChar({ ...newChar, time: e.target.value })}
        value={newChar.time}
      ></input>
      <input
        type="text"
        placeholder="image"
        onChange={(e) => setNewChar({ ...newChar, image: e.target.value })}
        value={newChar.image}
      ></input>
      <textarea
        placeholder="Lessons"
        onChange={(e) => setNewChar({ ...newChar, lessons: e.target.value })}
        value={newChar.lessons}
      ></textarea>
      <input type="submit" onClick={() => addChar()}></input>
    </div>
  );
}
