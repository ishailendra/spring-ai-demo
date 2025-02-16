import './App.css';
import {useState} from "react";
import ImageGenerator from "./components/ImageGenerator";
import AskAI from "./components/AskAI";
import CreateRecipe from "./components/CreateRecipe";

function App() {

    const [activeTab, setActiveTab] = useState('image-generator');
    return (
    <div className="App">
        <button className={activeTab === 'image-generator' ? 'active' : ''} onClick={() => setActiveTab('image-generator')}>Image Generator</button>
        <button className={activeTab === 'ask-ai' ? 'active' : ''} onClick={() => setActiveTab('ask-ai')}>Ask AI</button>
        <button className={activeTab === 'create-recipe' ? 'active' : ''} onClick={() => setActiveTab('create-recipe')}>Create Recipe</button>
        <div>
            {activeTab === 'image-generator' && <ImageGenerator/>}
            {activeTab === 'create-recipe' && <CreateRecipe/> }
            {activeTab === 'ask-ai' && <AskAI/>}
        </div>
    </div>
  );
}

export default App;
