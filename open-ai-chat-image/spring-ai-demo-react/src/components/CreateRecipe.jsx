import React, {useState} from 'react'

const CreateRecipe = () => {
    const [ingredients, setIngredients] = useState('');
    const [cuisine, setCuisine] = useState('any');
    const [dietaryRestriction, setDietaryRestriction] = useState('');
    const [recipe, setRecipe] = useState('');

    const createRecipe = async (recipe) => {
        const response = await fetch(`http://localhost:8080/api/create-recipe?ingredients=${ingredients}&cuisine=${cuisine}&dietaryRestriction=${dietaryRestriction}`)
        const data = await response.text()
        setRecipe(data);
    }

    return (
        <div className="tab-content">
            <h2>Create a Recipe</h2>
            <input type="text"
                   name="ingredients"
                   id="ingredients"
                   value={ingredients}
                   onChange={(e) => setIngredients(e.target.value)}
                   placeholder="Enter ingredients"
            />
            <input type="text"
                   name="cuisine"
                   id="cuisine"
                   value={cuisine}
                   onChange={(e) => setCuisine(e.target.value)}
                   placeholder="Enter cuisine type"
            />
            <input type="text"
                   name="dietaryRestriction"
                   id="dietaryRestriction"
                   value={dietaryRestriction}
                   onChange={(e) => setDietaryRestriction(e.target.value)}
                   placeholder="Enter dietary restriction"
            />
            <button onClick={createRecipe}>Create Recipe</button>
            <div className="output">
                <pre className="recipe-text">{recipe}</pre>
            </div>
        </div>
    )
}
export default CreateRecipe
