import React, {useState} from 'react'

const AskAi = () => {
    const [prompt, setPrompt] = useState('')
    const [chatResponse, setChatResponse] = useState('')

    const askAI = async () => {
        const response = await fetch(`http://localhost:8080/api/ask-ai?prompt=${prompt}`)
        const data = await response.text()
        console.log(data);
        setChatResponse(data);
    }
    return (
        <div className="tab-content">
            <h2>Talk to AI</h2>
            <input type="text"
                   name="chat-ai"
                   id="chat-ai"
                   value={prompt}
                   onChange={(e) => setPrompt(e.target.value)}
                   placeholder="Enter a prompt for AI"
            />
            <button onClick={askAI}>Ask AI</button>
            <div className="output">
                <p>{chatResponse}</p>
            </div>
        </div>
    )
}
export default AskAi
