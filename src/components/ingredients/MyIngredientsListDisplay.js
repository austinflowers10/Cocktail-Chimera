
//Function to display Ingredients List 
export const MyIngredientsListDisplay = ({ userIngredientsProp, fetchUserIngredientsProp,  setDisplayStateProp, setUserKeywordChoicesProp, setNewIngredientProp}) => {

    return <div className="my-ingredients-list-container">
        <div className="my-ingredient-cards-section">
        {
            //Map userIngredientsProp, show name, garnish, date added, and delete button for each
            userIngredientsProp.map(userIngredient => {
                return <div key={`my-ingredient-card--${userIngredient.id}`} className="my-ingredient-card">
                    <h4 className="ingredient-name">{userIngredient.name}</h4>
                    <p>Garnish? {userIngredient.isGarnish ? `Yes` : `No`}</p>
                    <p>Date Added: {userIngredient.dateAdded}</p>

                {/* edit user ingredient and replace in API with post */}
                    <button className="edit-ingredient-buttons" onClick={(event) => {
                        <></>
                    }}
                    >Edit</button>

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

        {/* Row for Buttons */}
        <div className="my-ingredients-bottom-buttons-row">
            <button className="manage-ingredients-button" onClick={(event) => {
                document.querySelectorAll('.manage-ingredients-button').forEach(button => button.style.display = "none");
                document.querySelectorAll('.add-ingredients-button').forEach(button => button.style.display = "none");
                document.querySelectorAll('.done-managing-list-button').forEach(button => button.style.display = "flex");
                document.querySelectorAll('.delete-ingredient-buttons').forEach(button => button.style.visibility = "visible");
                document.querySelectorAll('.edit-ingredient-buttons').forEach(button => button.style.visibility = "visible");
            }}>
                Manage Ingredients
            </button>

            <button className="done-managing-list-button" onClick={(event) => {
                document.querySelectorAll('.manage-ingredients-button').forEach(button => button.style.display = "flex");
                document.querySelectorAll('.add-ingredients-button').forEach(button => button.style.display = "flex");
                document.querySelectorAll('.done-managing-list-button').forEach(button => button.style.display = "none");
                document.querySelectorAll('.delete-ingredient-buttons').forEach(button => button.style.visibility = "hidden");
                document.querySelectorAll('.edit-ingredient-buttons').forEach(button => button.style.visibility = "hidden");
            }}>
                Done
            </button>

            <button className="add-ingredients-button" onClick={() => {
                    setDisplayStateProp('form')
                }}>
                Add an Ingredient
            </button>
        </div>
    </div>
}