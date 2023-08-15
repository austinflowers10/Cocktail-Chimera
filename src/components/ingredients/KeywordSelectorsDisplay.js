export const KeywordSelectorsDisplay = ({setMyIngredientsSectionContentsProp, chosenKeywordsRowContentProp, userKeywordChoicesProp, setUserKeywordChoicesProp, keywordsProp, newIngredientProp, setDisplayStateProp}) => {

    return <>
        <div className="keyword-selectors-container">
            <h4 className="ingredient-prompt">Add up to 4 Flavor Traits to describe {newIngredientProp.name ? newIngredientProp.name : `your Ingredient`}</h4>

        {/* show chosen keywords */}
            {chosenKeywordsRowContentProp}

        {/* display rows of keyword buttons to choose */}
            <div className="keyword-buttons-section">
                {
                    keywordsProp.map(keyword => {
                        return <button key={`keyword-option--${keyword.id}`} 
                            className="keyword keyword-option"
                            onClick={(event) => {                                            
                        //push the whole keyword object into userChoices, only if less than 4 
                                if (userKeywordChoicesProp.length < 4) {
                                    // console.log(`${userKeywordChoicesProp}, ${keyword.name}`)
                                    setUserKeywordChoicesProp(userKeywordChoicesProp => [...userKeywordChoicesProp, keyword])
                                
                                } else if (userKeywordChoicesProp.length === 4) {
                                    // console.log("4 choices made!")
                                    document.querySelector(".ingredient-prompt").classList.add('highlighted')
                                    setTimeout(() => {
                                        document.querySelector(".ingredient-prompt").classList.remove('highlighted');
                                    }, 500)
                                }
                            }} 
                        >{keyword.name}</button>
                    })
                }
            </div>
    {/* Done Button */}
            <button type="button" className="button done-choosing-keywords-button"
                    onClick={(event) => {
                    // if userkeywordChoices has at least 1, allow the button to show the form.
                        if (userKeywordChoicesProp.length) {
                            setDisplayStateProp('form')
                            
                        } else {
                    // if userkeywordChoices === 0, highlight the prompt in red for 2 seconds
                            document.querySelector(".choose-keyword-row").classList.add('highlighted')
                            setTimeout(() => {
                                document.querySelector(".choose-keyword-row").classList.remove('highlighted');
                            }, 500);
                        }
                    }}
            >Done</button>
        </div>
    </>
}