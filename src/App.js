import React, { useState } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";

function App() {
  const [isCentered, setIsCentered] = useState(false);
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [showText, setShowText] = useState("");

  function getMeaning() {
    if (searchWord.trim() !== "") {
      Axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
      ).then((response) => {
        setData(response.data[0]);
      });
    }
  }

  function playAudio() {
    if (data && data.phonetics && data.phonetics.length > 0) {
      let audio = new Audio(data.phonetics[0].audio);
      audio.play();
    }
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      getMeaning();
    }
  }

  return (
    <div className="App">
      <h1>Dictionary 101</h1>
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search..."
          style={{
            margin: '0 auto', // Center horizontally
            textAlign: isCentered ? 'center' : 'left',
          }}
          value={searchWord}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
          onFocus={() => setIsCentered(true)}
          onBlur={() => setIsCentered(false)}
          onKeyDown={handleKeyPress} // Handle Enter key press
        />
        <button
          onClick={() => {
            getMeaning();
          }}
        >
          <FaSearch size="20px" />
        </button>
      </div>
      {data && (
        <div className="showResults">
          <h2>
            {data.word}{" "}
            <button
              onClick={() => {
                playAudio();
              }}
            >
              <FcSpeaker size="26px" />
            </button>
          </h2>
          <h4>Parts of speech:</h4>
          <p>{data.meanings[0].partOfSpeech}</p>
          <h4>Definition:</h4>
          <p>{data.meanings[0].definitions[0].definition}</p>
          <h4>Example:</h4>
          <p>{data.meanings[0].definitions[0].example}</p>
        </div>
      )}
    </div>
  );
}

export default App;
