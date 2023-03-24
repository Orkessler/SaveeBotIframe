import './App.css';
import React, { useState } from "react";
import Axios from "axios";
import Alice from './Alice.jpg';
import Bill from './Bill.jpg';
import Devil from './devil.png';
import Angel from './angel.png';



function App() {

  const [postInput, setPostInput] = useState("");
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [isbot, setIsbot] = useState(false);
  const apiUrl = 'https://api.feedox.com/v1/ai/conversation';

  const [data, setData] = useState({ userInput: "", theAns: "" });


  const handlePostSubmit = (event) => {
    event.preventDefault();
    document.getElementById("post-input-text").style.display = "none";
    document.getElementById("post-button").style.display = "none";
    document.getElementById("post-output").style.display = "block";
    document.getElementById("dummy-comments").style.display = "block";
    console.log("postInput: " + postInput)
    event.preventDefault();
    getResponse();
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    setComments([comments, commentInput]);
    setCommentInput("");
    console.log("replay: " + commentInput)
    if (commentInput === "@savee") {
      setIsbot(true);
    }

    event.preventDefault();


  };

  const config = {
    headers: {
      'accept': '*/*',
      'content-type': 'application/json; charset=UTF-8'
    }
  };

  let requestData = {
    "messages": [
      {
        "role": "user",
        "content": "input: \"" + postInput + "\""
      }
    ],
    "config": {
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "temperature": 0,
      "user": "HWYnPaVfS3aoTLVlVxmAD4ISgwi2",
      "model": "gpt-4-0314"
    },
    "prompt": "You are a fact-checking AI assistant aimed to fight fake and misinformation content. You'll get posts from social media and you'll analyze the facts and try to explain what is incorrect and what is correct. You'll be truthful and factual as possible and attempt to convince the user. Keep it short and concise. Your focus is on statements about the holocaust.",
    "userId": "HWYnPaVfS3aoTLVlVxmAD4ISgwi2",
    "docs": []
  };

  async function getResponse() {
    await Axios.post(apiUrl, requestData, config)
      .then(response => {
        console.log("your response is:" + response.data[0].content);
        setData({ theAns: response.data[0].content });
      })
      .catch(error => {
        console.log(error);
      });
  }
  const Botcomment = ({ data }) => {
    console.log("data: " + data)

    return (
      <div className="comment-text">
        <img id="Angel" src={Angel} alt=""></img>
        <div className="user-info-post" >
          <span className="user-name">savee</span>
          <span className="user-tag">@savee</span>
          <span className="date">March 17</span>
        </div>
        <p className="dummy-comment">{data}</p>

      </div>
    );
  }


  return (

    //get input from user and print it as h1. when the user clicks on the button, the input is cleared and the answer is shown
    <div className="App">
      <form onSubmit={handlePostSubmit}>
        <div id="post-input">
          <div className="post-text">
            <img id="Devil" src={Devil} alt="Devil"></img>
            <div className="user-info-post" >
              <span className="user-name">Jews Hater</span>
              <span className="user-tag">@JewsHater</span>
              <span className="date">March 15</span>
            </div>
            <textarea id="post-input-text" rows="45" cols="80" placeholder="What Do you want to share today?" value={postInput} onChange={(event) => setPostInput(event.target.value)}></textarea>

            <button id="post-button" type="submit">Fake</button>
          </div>
        </div>
      </form >
      <div id="post-output" style={{ display: "none" }}>
        <p id="post-output-text">{postInput}</p>
      </div>
      <div id="dummy-comments" style={{ display: "none" }}>
        <div className="comment-text" >
          <img id="Alice" src={Alice} ></img>
          <div className="user-info-post" >
            <span className="user-name">Alice Gordon</span>
            <span className="user-tag">@Alicia754</span>
            <span className="date">March 16</span>
          </div>
          <p className="dummy-comment">OMG!! I didn't know that!</p>

          <div className="comment-text">
            <img id="Bill" src={Bill}></img>
            <div className="user-info-post" >
              <span className="user-name">Bill Smith</span>
              <span className="user-tag">@BillSmith11!</span>
              <span className="date">March 16</span>
            </div>
            <p className="dummy-comment">Is it for real??</p>

          </div>
        </div>

        <div>{isbot ?
          <div className="comment-text">
            <img id="Angel" src={Angel} alt=""></img>
            <div className="user-info-post" >
              <span className="user-name">savee</span>
              <span className="user-tag">@savee</span>
              <span className="date">March 17</span>
            </div>
            <p className="bot-comment">{data.theAns}</p>

          </div> : null}</div>
        <form onSubmit={handleCommentSubmit}>
          <input type="text" id="comment-input-text" value={commentInput} onChange={(event) => setCommentInput(event.target.value)} />
          <button id="comment-button" type="submit" name="button">reply</button>
        </form>

      </div>
    </div>
  );
}



export default App;
