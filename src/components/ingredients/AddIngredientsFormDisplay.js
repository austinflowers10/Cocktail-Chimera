//function to return jsx html for the "add ingredients form"
export const AddIngredientsFormDisplay = ({setMyIngredientsHeaderProp, newIngredientProp, setNewIngredientProp, chosenKeywordsRowContentProp, setMyIngredientsSectionContentsProp, handleAddIngredientButtonClickProp, userIngredientsProp, setDisplayStateProp, setUserKeywordChoicesProp}) => {
    
    return <>
        <form className="ingredient-form">

            <h4 className="ingredient-prompt">Please add an ingredient you have or plan to have soon</h4>

        {/* Name */}
            <fieldset>
                <div className="form-item-name">
                    <h4 htmlFor="name">Name:</h4>
                    <input
                        autoFocus
                        type="text"
                        className="form-control"
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
            </fieldset>

        {/* Garnish */}
            <fieldset>
                <div className="form-item-garnish">
                    <h4 htmlFor="isGarnish">Is this a Garnish?</h4>
                    <input type="checkbox"
                        checked={newIngredientProp.isGarnish}
                        onChange={
                            (event) => {
                                const copy ={...newIngredientProp}
                                copy.isGarnish = event.target.checked
                                setNewIngredientProp(copy)
                            }
                        } />
                </div>
            </fieldset>
        {/* Flavor Traits */}
            <fieldset>
                <h4 className="flavor-traits-subtitle">Flavor Traits</h4>

            {/* show chosen keywords row*/}
                {chosenKeywordsRowContentProp}
            
            {/* button to show keyword selectors menu */}
                <button type="button" className="add-keyword-button" onClick={(event) => {
                    setDisplayStateProp('selectors')}
                }>Select Flavor Traits</button>

            </fieldset>
            <div className="add-ingredients-buttons-row">
                <button type="button" className="add-new-ingredient-button" 
                    onClick={handleAddIngredientButtonClickProp}
                >Save Ingredient</button>
                
                {/* show cancel button depending on whether userIngredients exists*/}
                <button type="button" style={{ display: userIngredientsProp.length ? 'flex' : 'none' }}
                    className="cancel-new-ingredient-button"
                    onClick={() => {
                        setDisplayStateProp('list')
                    }}
                >Cancel</button>
            </div>
        </form>
    </>
}