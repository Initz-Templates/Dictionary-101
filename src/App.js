import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
import { FaSearch } from "react-icons/fa";
import { FcSpeaker } from "react-icons/fc";
import MyComponent from "./MyComponent";

function App() {
  const [isCentered, setIsCentered] = useState(false);
  const [data, setData] = useState("");
  const [searchWord, setSearchWord] = useState("");
  const [showText, setShowText] = useState("");
  const [isShowing, setIsShowing] = useState(true);

  useEffect(() => {
    const text = "Dictionary 101";
    let currentIndex = 0;
    let interval;

    const animateText = () => {
      if (isShowing) {
        interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setShowText(text.substring(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
            setIsShowing(false);
            currentIndex = text.length;
            setTimeout(() => {
              let hideInterval = setInterval(() => {
                if (currentIndex >= 0) {
                  setShowText(text.substring(0, currentIndex));
                  currentIndex--;
                } else {
                  clearInterval(hideInterval);
                  setIsShowing(true);
                  setShowText("");
                  currentIndex = 0;
                }
              }, 100);
            }, 1000); // Adjust the delay between animations
          }
        }, 100); // Adjust the interval for speed
      }
    };

    animateText();

    return () => clearInterval(interval);
  }, [isShowing]);

  function getMeaning() {
    Axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
    ).then((response) => {
      setData(response.data[0]);
    });
  }

  function playAudio() {
    let audio = new Audio(data.phonetics[0].audio);
    audio.play();
  }


  return (
    <div className="App">
      <h1>{showText}</h1>
      <MyComponent />
      <div className="searchBox">
        <input
          type="text"
          placeholder="Search..."
          style={{margin: '0 auto', // Center horizontally
          textAlign: isCentered ? 'center' : 'left',}}
          onChange={(e) => {
            setSearchWord(e.target.value);
          }}
          
          // onKeyDown={handleKeyPress}
          onFocus={() => setIsCentered(true)} // When focused, center align
          onBlur={() => setIsCentered(false)} // When blurred, revert to left alignment
        />
        <button
          onClick={()=>{
            getMeaning()
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
