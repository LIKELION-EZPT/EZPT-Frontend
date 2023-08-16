import React, { useState } from 'react';
import './Mainpage.css';

function Mainpage() {
    const [combinedText, setCombinedText] = useState("");
    const [chatResult, setChatResult] = useState("");
    
    async function inputText() {
        const input1 = document.getElementById('input1').value;
        const input2 = document.getElementById('input2').value;
        const input3 = document.getElementById('input3').value;
      
        const resultText = `${input1} ${input2} ${input3}`;
        setCombinedText(resultText);
        console.log(combinedText);

        try {
          const response = await fetch('./generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({combinedText:combinedText})
          });
          const data = await response.json();
          console.log(data);
          if (data.choices && data.choices.length > 0) {
            setChatResult(data.text);
          } else {
            setChatResult('No response from API');
          }
        } catch (e) {
          console.log(e);
          setChatResult('API request failed.');
        }
    }
    return (
        <div className="Mainpage">
            <div>
                <nav>
                    nav
                </nav>
                <div className="SideBar">
                    sidebar
                </div>
                <div className="Main">
                    <div className="Left">
                        <div className="Input1">
                            <input id='input1' type="text" className="input1" placeholder='예시1'/>
                        </div>
                        <div className="Input2">
                            <input id='input2' type="text" className="input2" placeholder='예시2'/>
                        </div>
                        <div className="Input3">
                            <input id='input3' type="text" className="input3" placeholder='예시3'/>
                        </div>
                        <button onClick={inputText}>send</button>
                        <p id="result">{combinedText}</p>
                    </div>
                    <div className="Right">
                        {chatResult}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Mainpage;
