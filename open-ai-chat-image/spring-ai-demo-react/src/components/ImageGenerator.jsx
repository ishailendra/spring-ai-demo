import {useState} from "react";

const ImageGenerator = () => {
    const [prompt, setPrompt] = useState('')
    const [imageUrls, setImageUrls] = useState([])

    const generateImages = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/generate-image-options?prompt=${prompt}`);
            const urls = await response.json();
            setImageUrls(urls)
        } catch (err) {

        }
    }

    return (
        <div className="tab-content">
            <h2>Generate Image</h2>
            <input type="text"
                   name="image-gen-prompt"
                   id="image-gen-prompt"
                   value={prompt}
                   onChange={(e) => setPrompt(e.target.value)}
                   placeholder="Enter prompt for image"
            />
            <button onClick={generateImages}>Generate Image</button>
            <div className="image-grid">
                {imageUrls.map((url, index) => <img key={index} src={url} alt={`Generated pics ${index}`} />)}
                {[...Array(4 - imageUrls.length)].map((_, index) => (
                    <div key={index + imageUrls.length} className="empty-image-slot"></div>
                ))}
            </div>
        </div>
    )
}
export default ImageGenerator
