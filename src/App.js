import Axios from "axios";
import "./App.css";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
//import Button from '@mui/material/Button';                //    I decided to remove this button

function App() {
  const apiUrl = 'https://api.feedox.com/v1/ai/conversation/5579120785547-8400';
  const [data, setData] = useState({ userInput: "", postInput: "" });
  const [showResults, setShowResults] = React.useState(false);
  const [showProgress, setShowProgress] = React.useState(false);
  const [response, setResponse] = useState("");


  //When the user press "enter" or on search button
  const handleSumbit = (e) => {
    // setData((data.postInput = "")); //first the post input is empty even ater some requests
    setShowResults(false); //first there are no results even ater some requests
    setData((data.postInput = data.userInput));
    setShowProgress(true);
    getResponse();
    e.preventDefault();
    console.log(data.postInput);
  };

  //Get the typing from the user
  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };


  let config = {
    headers: {
      'accept': '*/*',
      'accept-language': 'en-GB,en;q=0.9,en-US;q=0.8,he;q=0.7,es;q=0.6',
      'content-type': 'application/json; charset=UTF-8'
    }
  };

  let requestData = {
    "messages": [
      {
        "role": "user",
        "content": "input: \"" + data.userInput + "\""
      }
    ],
    "userId": "HWYnPaVfS3aoTLVlVxmAD4ISgwi2"
  };

  async function getResponse() {
    await Axios.post(apiUrl, requestData, config)
      .then(res => {
        console.log(requestData);
        console.log("your post is:" + data.postInput);
        console.log("your response is:" + res.data[0].content);
        setResponse(res.data[0].content);
      })
      .catch(error => {
        console.log(error);
      });
    response !== "" && setShowResults(true);
    setShowProgress(false);
  }

  //The Result components. It only appears when there are results for the search
  const Results = ({ response }) => {
    return (
      <div className="Results">
        <p>{response}</p>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <form onSubmit={handleSumbit}>
            <div>
              <input
                placeholder="Paste here the post suspected of being false about the Holocaust"
                onChange={(e) => handle(e)}
                type="text"
                id="userInput"
                className="App-input"
                autoComplete="off"
              />
            </div>
            <button>Get a response</button>
          </form>
        </div>
        {showProgress ? <CircularProgress padding-top="18px" /> : null}
        {showResults ? <Results response={response} /> : null}
      </header>
    </div>
  );
}

export default App;