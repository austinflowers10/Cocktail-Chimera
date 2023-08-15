import { useState, useEffect } from "react"
import "./MyIngredients.css"
// import loadingIcon from "../images/Blinking squares.gif"
import cocktailGif from "../images/cocktail-gif.gif"

//component for view showing database ingredient radio cards
export const RadioIngredientsDisplay = ({userIngredientsProp, setDisplayStateProp, ingredientsProp, chimeraUserObjProp, postUserKeywordJoinedObjectProp, fetchUserIngredientsProp, keywordsProp}) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [showSpinner, setShowSpinner] = useState(false)
    // const [isDisabled, setIsDisabled] = useState(false)

    //filter selectable ingredients to only those not in userIngredients 
    const selectableIngredientsArray = ingredientsProp.filter(ingredient => {
        //try to find a match in userIngredients
        const matchingUserIngredient = userIngredientsProp.find(userIngredient => {
            return userIngredient.name === ingredient.name
        })
        //if a match is not found, return that ingredient into the array
        if (!matchingUserIngredient) {
            return ingredient
        }
    })

    selectableIngredientsArray.sort((a, b) => {
        return a.isGarnish - b.isGarnish
    })

    //handle checked or unchecked upon change
    const handleCheckboxChange = (event) => {
        const matchingIngredient = selectableIngredientsArray.find(ingredient => ingredient.id === parseInt(event.target.value))
        
        if (event.target.checked) {
    // if checked, push into state variable
          setSelectedIngredients([...selectedIngredients, matchingIngredient]);
        } else {
    // if unchecked, filter return all other ingredients to filter it back out
          setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient.id !== parseInt(event.target.value)));
        }
    };

    //useEffect to enable or disable the submit button
    // useEffect(() => {
    //     selectedIngredients.length
    //     ? setIsDisabled(false)
    //     : setIsDisabled(true)

    // },[selectedIngredients]
    // )

    
    //handle post operation when Add These to My Ingredients is clicked
    const postAndFetchAll = async (event) => {
        event.preventDefault()

        const handleAddTheseIngredientsClick = async () => {
            setShowSpinner(true)
            
            // console.log('You clicked the button')

            //remove keywords arrays from ingredients to be sent, and post
            const postIngredient = async (expandedIngredient) => {

                //convert date to MM-DD-YYYY
                const currentDate = new Date();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');
                const day = String(currentDate.getDate()).padStart(2, '0');
                const year = currentDate.getFullYear();

                const formattedDate = `${month}-${day}-${year}`;

                const ingredientToSendToAPI = {
                    userId: chimeraUserObjProp.id,
                    name: expandedIngredient.name,
                    isGarnish: expandedIngredient.isGarnish,
                    dateAdded: formattedDate
                }
                
                return fetch(`http://localhost:8088/userIngredients`, {
                    method: "POST",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(ingredientToSendToAPI)
                })
            }

            //only post if at least one selected ingredient exists
            if (selectedIngredients.length) {
                for (const selectedIngredient of selectedIngredients) {
                    console.log(`post ingredient ${selectedIngredient.name}`)
                //POST each ingredient to the API
                    await postIngredient(selectedIngredient)
                    .then(response => response.json())
                    .then((userIngredient) => {
                        if (!userIngredient.isGarnish) {
                //loop through and give each one the correct format for the joined table
                            return selectedIngredient.ingredientKeywords.map(ingredientKeyword => {
                                console.log(`mapping joined keyword with userIngredient Id ${userIngredient.id}`)
                            //format each keyword; add the id of the userIngredient response
                                return {
                                    userIngredientId: userIngredient.id,
                                    keywordId: ingredientKeyword.keywordId
                                }
                            })
                        } else {
                            return null
                        }
                    })
                        .then(async (selectedIngredientJoinedKeywords) => {
                        //if the ingredient has keywords, post them
                            if (selectedIngredientJoinedKeywords) {
                            //POST the array of user keyword objects to the API
                                for (const keyword of selectedIngredientJoinedKeywords) {
                                    console.log(`post keyword loop at keyword ${JSON.stringify(keyword)}`)
                                await postUserKeywordJoinedObjectProp(keyword)
                                    // .then(response => response.json())
                                } 
                            }           
                        })
                }
            }
        }
        await handleAddTheseIngredientsClick()
        await fetchUserIngredientsProp()
    }


    if (!showSpinner) {


        return <div className="radio-ingredients-container">

            
            <div className="radio-ingredients-buttons-row">
                <div className="radio-space-holder"></div>
                <button className="button add-selected-ingredients-button" 
                    disabled={!selectedIngredients.length}
                    onClick={postAndFetchAll}
                >Add Selected Ingredients</button>
                <button className="button add-new-ingredient-button" onClick={(event) => {
                        setDisplayStateProp("form")
                    }}
                >New Ingredient
                </button>
                    
                <button style={{ display: userIngredientsProp.length ? 'block' : 'none' }}
                    className="button cancel-add-ingredients-button"
                    onClick={() => {
                        setDisplayStateProp('list')
                    }}
                >Cancel</button>
            </div>

            <div className="radio-ingredients-card-section">
                {
            //map a card for each ingredient with a radio selector next to the name 
                    selectableIngredientsArray.map(ingredient => {
                        //match the ingredientKeyword objects to the original keyword objects, push to an array
                        const keywordsOfIngredient = []
                        for (const ingredientKeyword of ingredient.ingredientKeywords) {
                            const matchingKeywordObj = keywordsProp.find(keyword => {
                                return ingredientKeyword.keywordId === keyword.id 
                            })
                            keywordsOfIngredient.push(matchingKeywordObj)
                        }

                        return <div key={`radio-ingredient-card--${ingredient.id}`} className="radio-ingredient-cards">

                            <div className="radio-ingredient-name-row">
                                <input className="radio-ingredient-input" 
                                    type="checkbox" 
                                    value={ingredient.id}
                                    onChange={handleCheckboxChange}
                                />
                                <h4 className="radio-ingredient-name">{ingredient.name}</h4>
                                <div className="radio-name-space-holder"></div>
                            </div>

                            <div className="radio-ingredient-keywords-rows">
                                {
                                    keywordsOfIngredient.length
                                    ? keywordsOfIngredient.map(keyword => {
                                            return <button key={`keyword--${keyword.id}`} className="keyword">{keyword.name}</button>
                                        })
                                    
                                    : <p className="radio-ingredient-garnish" style={{margin: '0'}}>(Garnish)</p>
                                }
                            </div>
                        </div>
                    })
                }   
            </div>
        </div>
    } else {
        return <div className="loading-icon-container">
            <img className="loading-icon" src={cocktailGif} alt="Loading"/>
        </div>
    }
}