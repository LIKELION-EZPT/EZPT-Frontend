import React, { useState, useEffect } from "react";
import { Configuration, OpenAIApi } from "openai";
import "./Mainpage.css";

const KEY = process.env.REACT_APP_OPENAI_API_KEY;

const ChatbotApp = () => {
  const configuration = new Configuration({
    apiKey: KEY,
  });

  const openai = new OpenAIApi(configuration);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatList, setChatList] = useState([]);
  
  useEffect(() => {
    const storedChatList = JSON.parse(localStorage.getItem("chatList")) || [];
    setChatList(storedChatList); // Load chatList from local storage
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const promptValue = `${input1} ${input2} ${input3}`;

    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: promptValue,
        temperature: 0.5,
        max_tokens: 100,
      });

      setApiResponse(result.data.choices[0].text);

      // Add the new prompt to chatList
      const newChatEntry = {
        input1,
        input2,
        input3,
        prompt: promptValue,
        response: result.data.choices[0].text,
      };

      const updatedChatList = [...chatList, newChatEntry];

      // Save updatedChatList to local storage
      localStorage.setItem("chatList", JSON.stringify(updatedChatList));
      setChatList(updatedChatList);
      console.log("Updated chatList:", updatedChatList);

      setInput1(""); // Clear input1
      setInput2(""); // Clear input2
      setInput3(""); // Clear input3

    } catch (e) {
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };

  const handleReset = () => {
    localStorage.removeItem("chatList"); // Clear local storage
    setChatList([]);
    console.log(chatList);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="Input1">Input 1:</label>
            <textarea
              className="input1"
              type="text"
              value={input1}
              placeholder="Please ask to openai"
              onChange={(e) => setInput1(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="Input2">Input 2:</label>
            <textarea
              className="input2"
              type="text"
              value={input2}
              placeholder="Please ask to openai"
              onChange={(e) => setInput2(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="Input3">Input 3:</label>
            <textarea
              className="input3"
              type="text"
              value={input3}
              placeholder="Please ask to openai"
              onChange={(e) => setInput3(e.target.value)}
            ></textarea>
          </div>
          <button disabled={loading} type="submit">
            {loading ? "Generating..." : "Generate"}
          </button>
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>   
      {apiResponse && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <pre>
            <strong>API response:</strong>
            <div>
              {apiResponse}
            </div>
          </pre>
        </div>
      )}
      <div className="chat">
        <div className="list">
          Chat List
          {chatList.map((entry, index) => (
            <div key={index}>
              <strong>Prompt:</strong> {entry.prompt}
              <br />
              <strong>Response:</strong> {entry.response}
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatbotApp;
