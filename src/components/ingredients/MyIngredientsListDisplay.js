
//Function to display Ingredients List 
export const MyIngredientsListDisplay = ({ userIngredientsProp, fetchUserIngredientsProp,  setDisplayStateProp, keywordsProp}) => {
    return <div className="my-ingredients-list-container">

        {/* Row for Buttons */}
        <div className="button my-ingredients-buttons-row">
            <div className="space-holder"></div>
            <button className="manage-ingredients-button" onClick={(event) => {
                document.querySelectorAll('.manage-ingredients-button').forEach(button => button.style.display = "none");
                document.querySelectorAll('.add-ingredients-button').forEach(button => button.style.display = "none");
                document.querySelectorAll('.add-new-ingredient-button').forEach(button => button.style.display = "none");
                document.querySelectorAll('.done-managing-list-button').forEach(button => button.style.display = "block");
                document.querySelectorAll('.delete-ingredient-buttons').forEach(button => button.style.visibility = "visible");
                document.querySelectorAll('.edit-ingredient-buttons').forEach(button => button.style.visibility = "visible");
            }}>
                Manage Ingredients
            </button>

            <button className="button done-managing-list-button" onClick={(event) => {
                document.querySelectorAll('.manage-ingredients-button').forEach(button => button.style.display = "block");
                document.querySelectorAll('.add-ingredients-button').forEach(button => button.style.display = "block");
                document.querySelectorAll('.add-new-ingredient-button').forEach(button => button.style.display = "block");
                document.querySelectorAll('.done-managing-list-button').forEach(button => button.style.display = "none");
                document.querySelectorAll('.delete-ingredient-buttons').forEach(button => button.style.visibility = "hidden");
                document.querySelectorAll('.edit-ingredient-buttons').forEach(button => button.style.visibility = "hidden");
            }}>
                Done
            </button>

            <button className="button add-ingredients-button" onClick={() => {
                    setDisplayStateProp('radio')
                }}>
                Add Ingredients
            </button>
            <button className="button add-new-ingredient-button" onClick={(event) => {
                    setDisplayStateProp("form")
                }}
                >New Ingredient
            </button>
        </div>
        <div className="my-ingredient-cards-section">
        {
            //Map userIngredientsProp, show name, garnish, date added, and delete button for each
            userIngredientsProp.map(userIngredient => {
                const keywordsOfIngredient = []
                for (const ingredientKeyword of userIngredient.userIngredientKeywords) {
                    const matchingKeywordObj = keywordsProp.find(keyword => {
                        return ingredientKeyword.keywordId === keyword.id 
                    })
                    keywordsOfIngredient.push(matchingKeywordObj)
                }

                return <div key={`my-ingredient-card--${userIngredient.id}`} className="my-ingredient-card">
                    <h4 className="my-ingredient-name">{userIngredient.name}</h4>

                    <div className="user-ingredient-keywords-rows">
                            {
                                keywordsOfIngredient.length
                                ? keywordsOfIngredient.map(keyword => {
                                        return <button key={`keyword--${keyword.id}`} className="keyword">{keyword.name}</button>
                                    })
                                
                                : <p style={{margin: '0'}}>(Garnish)</p>
                            }
                    </div>
                    
                    <p>Date Added: {userIngredient.dateAdded}</p>

                {/* edit user ingredient and replace in API with post */}
                    {/* <button className="edit-ingredient-buttons" onClick={(event) => {
                        <></>
                    }}
                    >Edit</button> */}

                {/* delete userIngredient from API */}    
                    <button className="delete-ingredient-buttons" onClick={(event) => {
                        event.preventDefault()
                        return fetch(`http://localhost:8088/userIngredients/${userIngredient.id}`, { method: "DELETE" })
                            .then(fetchUserIngredientsProp)
                    }}
                    >Delete</button>
                    </div>
            })
        }
        </div>
        
    </div>
}