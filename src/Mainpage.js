import React, { useState, useEffect } from "react";
import "./MainPage.scss";
import { OpenAIApi, Configuration } from "openai";
import chatimg from "./chat.png";
import plusimg from "./plus.png";
import sendimg from "./send.png";
import Sidebar from './Sidebar';

const KEY = process.env.REACT_APP_OPENAI_API_KEY;

const MainPage =() => {

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
    const [isSideMenuVisible, setSideMenuVisible] = useState(false);

  const toggleSideMenu = () => {
    setSideMenuVisible(!isSideMenuVisible);
  };

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

    return(
        <div className="all">
            <div className="navbar">
                <div className="navlist">
                    <text className="home">HOME</text>
                    <text className="about">ABOUT</text>
                </div>
            </div>
            <div className="body">
                <div className="sidebar">
                    <div className="guideline" onClick={toggleSideMenu}>가이드라인</div>
                        {isSideMenuVisible && (
                        <div className="side-menu">
                            <p>첫번째</p>
                            <p>두번째</p>
                            <p>세번째</p>
                            </div>
                        )}
                    <div className="chatbox">내 채팅 목록</div>
                    <div className="newchat">
                        <img src={ plusimg } alt="" className="plus" />
                        <img src={ chatimg } alt="" className="chatimg" />
                        <p>새로운 채팅</p>
                    </div>
                    <div className="separator">
                    </div>
                    <div className="chatlist">
                        
                    </div>
                </div>
                <div className="chat">
                    <form onSubmit={handleSubmit} className="question">
                        <div className="input1">
                            <label htmlFor="Input1" className="input1name">GPT 역할</label>
                            <textarea
                            className="input1_text"
                            type="text"
                            value={input1}
                            placeholder="Please ask to openai"
                            onChange={(e) => setInput1(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="input2">
                            <label htmlFor="Input2" className="input2name">예시 or 맥락</label>
                            <textarea
                            className="input2_text"
                            type="text"
                            value={input2}
                            placeholder="Please ask to openai"
                            onChange={(e) => setInput2(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="input3">
                            <label htmlFor="Input3" className="input3name">구체적인 내용</label>
                            <textarea
                            className="input3_text"
                            type="text"
                            value={input3}
                            placeholder="Please ask to openai"
                            onChange={(e) => setInput3(e.target.value)}
                            ></textarea>
                        </div>
                        <button disabled={loading} type="submit" className="send">
                            {loading ? "생성중..." : "답변 생성하기"}
                            <img src={sendimg} className="send_img">
                            </img>
                        </button>
                    </form>
                    <div className="separator2"></div>
                    <div className="answer">
                        <button type="button" onClick={handleReset} className="resetbutton">
                            채팅 초기화
                        </button>
                        <div className="answerlist">
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
            </div>
        </div>
    );
}

export default MainPage;