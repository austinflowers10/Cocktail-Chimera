//function to return jsx html for the "add ingredients form"
export const AddIngredientsFormDisplay = ({ newIngredientProp, setNewIngredientProp, chosenKeywordsRowContentProp,  handleAddIngredientButtonClickProp, userIngredientsProp, setDisplayStateProp}) => {
    
    return <>
        <form className="ingredient-form">

            <h4 className="ingredient-prompt">Please add an ingredient you want to use</h4>

        {/* Name */}
                <div className="form-item-name">
                    <h4 className="name-label" htmlFor="name">Name:</h4>
                    <input
                        autoFocus
                        type="text"
                        className="name-input"
                        placeholder="Ingredient"
                        value={newIngredientProp.name}
                        onChange={
                            (event) => {
                                const copy ={...newIngredientProp}
                                copy.name = event.target.value
                                setNewIngredientProp(copy)
                            }
                        } />
                </div>

        {/* Garnish */}
                <div className="form-item-garnish">
                    <h4 className="garnish-label" htmlFor="isGarnish">Garnish?</h4>
                    <input className="garnish-checkbox"
                        type="checkbox"
                        checked={newIngredientProp.isGarnish}
                        onChange={
                            (event) => {
                                const copy ={...newIngredientProp}
                                copy.isGarnish = event.target.checked
                                setNewIngredientProp(copy)
                            }
                        } />
                </div>
        {/* Flavor Traits */}
            <div className="flavor-traits-form">
                <h4 className="flavor-traits-subtitle">Flavor Traits</h4>

            {/* show chosen keywords row*/}
                {chosenKeywordsRowContentProp}
            
            {/* button to show keyword selectors menu */}
                <button type="button" className="add-keyword-button" onClick={(event) => {
                    setDisplayStateProp('selectors')}
                }>Select Flavor Traits</button>

            </div>
            <div className="add-ingredients-buttons-row">
                <button type="button" className="save-new-ingredient-button" 
                    onClick={handleAddIngredientButtonClickProp}
                >Save Ingredient</button>
                
                <button type="button" 
                    className="cancel-new-ingredient-button"
                    onClick={() => {
                        userIngredientsProp.length
                        ? setDisplayStateProp('list')
                        : setDisplayStateProp('radio')
                    }}
                >Cancel</button>
            </div>
        </form>
    </>
}

// style={{ display: userIngredientsProp.length ? 'flex' : 'none' }}