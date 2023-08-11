import { useNavigate } from "react-router-dom"
import "./CreateCocktail.css"
import { useEffect, useState } from "react"
import { IoStar } from "react-icons/io5";
import { ChangeTemplateMenu } from "./ChangeTemplateMenu"; 
import { FilteredIngredientsDisplay } from "./FilteredIngredientsDisplay";

export const CreateCocktail = ({classicCocktailsProp, chosenClassicProp, setChosenClassicProp, favoritesProp, ingredientsProp, userIngredientsProp, chimeraUserObjProp}) => {
    
    const [chosenClassicPropIngredients, setChosenClassicPropIngredients] = useState([])
    const [ingredientChoices, setIngredientChoices] = useState([])
    const [ingredientChoicesSectionContents, setIngredientChoicesSectionContents] = useState(null)
    const [flavorTraitsSectionContents, setFlavorTraitsSectionContents] = useState(null)
    const [filteredIngredientsSectionContents, setFilteredIngredientsSectionContents] = useState(null)
    const [filteringIngredient, setFilteringIngredient] = useState(null)
    const [middleSubtitle, setMiddleSubtitle] = useState('')
    const [ingredientClicked, setIngredientClicked] = useState(false)
    const [newCocktail, setNewCocktail] = useState({
        userId: chimeraUserObjProp.id,
        name: '',
        description: '',
        dateCreated: ''
    })

    //choose what to show and hide based on the value of chosenClassicsProp
    useEffect(() => {
        if (chosenClassicProp) {
            document.querySelector(".flavor-traits-container").style.visibility = "visible"
            document.querySelector(".change-template-menu").style.visibility = "hidden"
            document.querySelector(".create-subtitle-name").style.visibility = "visible"
            document.querySelector(".template-classic-description-container").style.visibility = "visible"
            document.querySelector(".create-subtitle-ingredients").style.visibility = "visible"
            document.querySelector(".new-cocktail-container").style.visibility = "visible"
            
            setMiddleSubtitle('Ingredients and Flavor Traits')
        } else {
            document.querySelector(".change-template-menu").style.visibility = "visible"
            document.querySelector(".flavor-traits-container").style.visibility = "hidden"
            document.querySelector(".create-subtitle-name").style.visibility = "hidden"
            document.querySelector(".template-classic-description-container").style.visibility = "hidden"
            document.querySelector(".create-subtitle-ingredients").style.visibility = "hidden"
            document.querySelector(".new-cocktail-container").style.visibility = "hidden"

            setMiddleSubtitle('Choose a Template')
        }

    },[chosenClassicProp]
    )
    
    //when ingredients exist, give back all ingredients found on chosenClassicProp.classicsIngredients
    useEffect(() => {
        if (chosenClassicProp) {
            const matchingIngredientsArr = []
            
            //loop through all ingredients
            for (let ingredient of ingredientsProp) {
                
                //for each ingredient, match with the ingredient in chosenClassicProp
                const matchingIngredient = chosenClassicProp.classicsIngredients.find(classicIngredient => classicIngredient.ingredientId === ingredient.id)
                
                //When one is found, push it to the array
                if (matchingIngredient) {
                    matchingIngredientsArr.push(ingredient)
                }
            }

            matchingIngredientsArr.sort(
                (a,b) => {
                    return a.isGarnish - b.isGarnish
                }
            )

            setChosenClassicPropIngredients(matchingIngredientsArr)

        }
    },[ingredientsProp, chosenClassicProp]
    )

    
    //when chosenclassicpropingredients exist, set IngredientChoices default to template cocktail ingredients
    useEffect(() => {
        setIngredientChoices(chosenClassicPropIngredients)
    }, [chosenClassicPropIngredients]
    )
          
    //Set the display to show buttons with each Ingredient Choice
    useEffect(() => {
        if (ingredientChoices.length) {

            const ingredientButtonsJSX = chosenClassicPropIngredients.map((classicIngredient) => {

                const classicIngredientIndex = chosenClassicPropIngredients.indexOf(classicIngredient)

                return <button className="ingredient-choice-button" key={`ingredient-choice-${classicIngredient.id}`} 
                    onClick={(event) => {
                        event.preventDefault()
                        setFilteringIngredient(classicIngredient)
                        setIngredientClicked(true)
                    }}
                    >{ingredientChoices[classicIngredientIndex].name}</button>
            })

            setIngredientChoicesSectionContents(ingredientButtonsJSX)
        }

        if (chosenClassicProp) {
            setFlavorTraitsSectionContents(cocktailIngredientRows())
        }
    },[ingredientChoices]
    )

    //when filteringIngredient changes, check if it exists. if it does exist, refresh the component(?)
    //if filteredIngredient has been cleared, do nothing
    useEffect(() => {
        if (filteringIngredient) {
            setFilteredIngredientsSectionContents(filteredIngredientsComponent())
        }
    },[filteringIngredient]
    )

    useEffect(() => {
        if (filteredIngredientsSectionContents) {
            if (ingredientClicked) {
                //set visibility of filteredIngredientsMenu
                document.querySelector(".filtered-ingredients-list-menu").style.visibility = "visible"
                document.querySelector(".new-cocktail-container").style.visibility = "hidden"
            } else {
                //set visibility of filteredIngredientsMenu
                document.querySelector(".filtered-ingredients-list-menu").style.visibility = "hidden"
                document.querySelector(".new-cocktail-container").style.visibility = "visible"
            }
        }

    },[filteredIngredientsSectionContents, ingredientClicked])

    // useEffect(() => {
    //     if (ingredientClicked === true) {
    //         //set visibility of filteredIngredientsMenu
    //         document.querySelector(".filtered-ingredients-list-menu").style.visibility = "visible"
    //         document.querySelector(".new-cocktail-container").style.visibility = "hidden"
    //     }
    // }, [ingredientClicked]
    // )

    //hide or show items based on middle subtitle
    useEffect(() => {
        if (chosenClassicProp) {
            if (middleSubtitle === 'Ingredients and Flavor Traits') {
                document.querySelector(".change-template-menu").style.visibility = "hidden"
                document.querySelector(".flavor-traits-container").style.visibility = "visible"
                document.querySelector(".template-change-button").style.display = "block"
                document.querySelector(".cancel-template-change-button").style.display ="none"
            } else if (middleSubtitle === 'Choose a Template') {
                document.querySelector(".change-template-menu").style.visibility = "visible"
                document.querySelector(".flavor-traits-container").style.visibility = "hidden"
                document.querySelector(".template-change-button").style.display = "none"
                document.querySelector(".cancel-template-change-button").style.display = "block"
            }
        }
    }, [middleSubtitle]
    )

    const filteredIngredientsComponent = () => {
        return <FilteredIngredientsDisplay
            filteringIngredientProp={filteringIngredient}
            userIngredientsProp={userIngredientsProp}
            setIngredientClickedProp={setIngredientClicked}
            
            />
    }



    //Map a section for each ingredient containing 3 rows
    //for each ingredient in chosenClassicProp, create a row
    //then, inside the row, do 3 rows. Populate the name of ingredient (H4?) in the top row, the 2nd row will hold each flavor keyword that will stay, and 3rd row will hold flavors that will change

    //match chosenClassicProp to Ingredient Keywords: 
    const cocktailIngredientRows = () => {
            //map over each ingredient of chosenClassicProp
        return chosenClassicProp.classicsIngredients.map(classicsIngredient => {
            //go get the ingredient corresponding to the ingredientId
            const currentIngredientObj = ingredientsProp.find(ingredient => classicsIngredient.ingredientId === ingredient.id)

            return <section key={`ingredient-row--${currentIngredientObj.id}`} className={`ingredient-row--${currentIngredientObj.id}`}>
                <h4 className="ingredient-subtitle">{currentIngredientObj.name}</h4>
                {
                    !currentIngredientObj.isGarnish
                    ? <>
                        <div className="sub-row shared-keyword-sub-row">
                            {/* shared keyword row */}
                        </div>
                        <div className="sub-row changed-keyword-sub-row">
                            {/* changed keyword row  */}
                        </div>
                    </>
                    : <div className="sub-row garnish-sub-row">
                        <p>(Garnish)</p>
                    </div>
                }
            </section>
        })
    }

        //when one of those options are clicked, update the flavor traits section to put the staying flavors in row 2 and changing flavors in row 3.  



    const chosenIsFavorite = favoritesProp.find(favorite => chosenClassicProp?.id === favorite.cocktailId)

    return <>
        <h2 className="create-cocktail-header">Create a Cocktail</h2>
        <div className="create-cocktail-container">
            {/* insert the change template menu to be shown/hidden */}
            <ChangeTemplateMenu 
                favoritesProp={favoritesProp} 
                classicCocktailsProp={classicCocktailsProp}
                setChosenClassicProp={setChosenClassicProp}
                setMiddleSubtitleProp={setMiddleSubtitle}
                middleSubtitleProp={middleSubtitle}
                />
            {/* Insert filtered ingredients menu to be shown/hidden */}
            {filteredIngredientsSectionContents}
        {/* Left Section */}
            <div className="template-classic-description-container">
                <h3 className="create-subtitles create-subtitle-name">Template: {chosenClassicProp?.name}
                    {
                        chosenIsFavorite
                        ? <IoStar className="subtitle-star"/>
                        : ""
                    }
                </h3>
            
                <div className="template-classic-description-section">
                    {
                        chosenClassicProp
                        ? <>
                            <div className="template-image-container">
                                <img className="template-classic-image" src={chosenClassicProp.image}/>
                            </div>
                            <p className="template-classic-description">
                                {chosenClassicProp.description}
                            </p>
                            <div className="classic-buttons-row">
                                <div className="classic-space-holder"></div>
                                
                                <button className="button template-change-button" 
                                    //Show menu on click
                                    onClick={(event) => {
                                        setMiddleSubtitle('Choose a Template')
                                    }
                                }>Change</button>
                                <button className="button cancel-template-change-button" 
                                    onClick={(event) => {
                                        setMiddleSubtitle('Ingredients and Flavor Traits')
                                    }
                                }>Cancel</button>
                            </div>
                        </>
                        : <p>Please choose a cocktail to use as a template</p>   
                    }
                </div>
            </div>
        {/* Middle Section */}
            <div className="flavor-traits-container">
                <h3 className="create-subtitles create-subtitle-flavors">{middleSubtitle}</h3>
                <div className="flavor-traits-section">
                    {flavorTraitsSectionContents}
                </div>
            </div>
        {/* Right Section */}
            <div className="new-cocktail-container">
                <h3 className="create-subtitles create-subtitle-ingredients">New Cocktail</h3>
                <div className="new-cocktail-section">
                    <form className="new-cocktail-form">
                    {/* Name */}
                    <fieldset className="new-cocktail-name">
                            <h4 htmlFor="name">Name:</h4>
                            <input
                                autoFocus
                                type="text"
                                className="new-cocktail-name-input"
                                placeholder="New Cocktail"
                                value={newCocktail.name}
                                onChange={
                                    (event) => {
                                        const copy ={...newCocktail}
                                        copy.name = event.target.value
                                        setNewCocktail(copy)
                                    }
                                } />
                    </fieldset>
                {/* Ingredient Choices Section */}
                    <div className="ingredient-choices-section">
                        {ingredientChoicesSectionContents}
                    </div>
                {/* Recipe Description */}
                    <fieldset className="new-cocktail-description">
                            <h4 htmlFor="name">Recipe Description:</h4>
                            <textarea
                                className="new-cocktail-description-input"
                                placeholder="New Cocktail Recipe"
                                value={newCocktail.description}
                                onChange={(event) => {
                                    const copy = { ...newCocktail };
                                    copy.description = event.target.value;
                                    setNewCocktail(copy);
                                }}
                                />
                    </fieldset>
                    <div className="new-cocktail-buttons-row">
                        <button type="button" className="save-new-cocktail-button" 
                            // onClick={<></>}
                        >Save Cocktail</button>
                        
                        {/* Extra Button */}
                        {/* <button type="button" 
                            className=""
                            onClick={() => {
                    
                            }}
                        ></button> */}
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}
//------------------------------------------------------------------------------------------------------


