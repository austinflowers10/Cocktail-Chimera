import { useNavigate } from "react-router-dom"
import "./CreateCocktail.css"
import { useEffect, useState } from "react"
import { IoStar } from "react-icons/io5";
import { ChangeTemplateMenu } from "./ChangeTemplateMenu";

//Optional:
//click a button in the template section to pop up a list of cocktails. show the favorites at the top and then the non-favorites under them. when clicked, set the cocktail as the chosen classic prop 

export const CreateCocktail = ({classicCocktailsProp, chosenClassicProp, setChosenClassicProp, favoritesProp, ingredientsProp}) => {
    
    const [chosenClassicPropIngredients, setChosenClassicPropIngredients] = useState([])
    const [ingredientChoices, setIngredientChoices] = useState([])
    const [ingredientChoicesSectionContents, setIngredientChoicesSectionContents] = useState(null)
    const [middleSubtitle, setMiddleSubtitle] = useState('')


    //choose what to show and hide based on the value of chosenClassicsProp
    useEffect(() => {
        if (chosenClassicProp) {
            document.querySelector(".flavor-traits-section").style.visibility = "visible"
            document.querySelector(".change-template-menu").style.visibility = "hidden"
            document.querySelector(".create-subtitle-name").style.visibility = "visible"
            document.querySelector(".template-classic-description-section").style.visibility = "visible"
            document.querySelector(".create-subtitle-ingredients").style.visibility = "visible"
            document.querySelector(".ingredient-selectors-section").style.visibility = "visible"
            
            setMiddleSubtitle('Flavor Traits')
        } else {
            document.querySelector(".change-template-menu").style.visibility = "visible"
            document.querySelector(".flavor-traits-section").style.visibility = "hidden"
            document.querySelector(".create-subtitle-name").style.visibility = "hidden"
            document.querySelector(".template-classic-description-section").style.visibility = "hidden"
            document.querySelector(".create-subtitle-ingredients").style.visibility = "hidden"
            document.querySelector(".ingredient-selectors-section").style.visibility = "hidden"

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

    //when chosenclassicpropingredients exist, set IngredientChoices default to original cocktail ingredients
    useEffect(() => {
        setIngredientChoices(chosenClassicPropIngredients)
    }, [chosenClassicPropIngredients]
    )
          
    //Set the display to show buttons with each Ingredient Choice
    useEffect(() => {
        setIngredientChoicesSectionContents(
        ingredientChoices.map(ingredient => {
                return <button key={`ingredient-choice-${ingredient.id}`}>{ingredient?.name}</button>
            })
        )    
    },[ingredientChoices]
    )

    // if (!ingredientChoices) {
    //     return null
    // }

    //Map a section for each ingredient containing 3 rows
    //for each ingredient in chosenClassicProp, create a row
    //then, inside the row, do 3 rows. Populate the name of ingredient (H4?) in the top row, the 2nd row will hold each flavor keyword that will stay, and 3rd row will hold flavors that will change

    //match chosenClassicProp to Ingredient Keywords: 
    //PUT THIS IN A USE EFFECT THAT RERENDERS THIS WHEN INGREDIENT CHOICES CHANGE
    const cocktailIngredientRows = () => {
            //map over each ingredient of chosenClassicProp
        return chosenClassicProp.classicsIngredients.map(classicsIngredient => {
            //go get the ingredient corresponding to the ingredientId
            const currentIngredientObj = ingredientsProp.find(ingredient => classicsIngredient.ingredientId === ingredient.id)

            return <section className={`ingredient-row--${currentIngredientObj.id}`}>
                <h4 className="ingredient-subtitle">{currentIngredientObj.name}</h4>
                <div className="shared-keyword-sub-row">
                    shared keyword row
                </div>
                <div className="changed-keyword-sub-row">
                    changed keyword row 
                </div>
            </section>
        })
    }

    //for the New Ingredients section, create a function: iterate over each ingredient of the classic cocktail, and return a button with the ingredient choice name inside it upon render.

    // const ingredientSelectorButtons = () => {

    //     return 


    // }
        //when clicked, show a box with the list of ingredients to choose from. somehow, i need to show how similar they are and sort by most similar at the top, with green indicators of number shared 
        //when one of those options are clicked, update the flavor traits section to put the staying flavors in row 2 and changing flavors in row 3.  



    const chosenIsFavorite = favoritesProp.find(favorite => chosenClassicProp?.id === favorite.cocktailId)

    return <>
        <h2 className="create-cocktail-header">Create a Cocktail</h2>
        <div className="create-subtitles-row">
            <h3 className="create-subtitles create-subtitle-name">Template: {chosenClassicProp?.name}
                {
                    chosenIsFavorite
                    ? <IoStar className="subtitle-star"/>
                    : ""
                }
            </h3> 
            <h3 className="create-subtitles create-subtitle-flavors">{middleSubtitle}</h3>
            <h3 className="create-subtitles create-subtitle-ingredients">New Ingredients</h3>
        </div>
        <div className="create-cocktail-container">
            {/* insert the change template menu to be shown/hidden */}
            <ChangeTemplateMenu 
                favoritesProp={favoritesProp} 
                classicCocktailsProp={classicCocktailsProp}
                setChosenClassicProp={setChosenClassicProp}
                setMiddleSubtitleProp={setMiddleSubtitle}
                />

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
                        <button className="template-change-button" onClick={
                            //Show menu on click
                            (event) => {
                                document.querySelector(".change-template-menu").style.visibility = "visible"
                                document.querySelector(".flavor-traits-section").style.visibility = "hidden"
                                setMiddleSubtitle('Choose a Template')
                            }
                        }>Change</button>
                    </>
                    : <p>Please choose a cocktail to use as a template</p>   
                }
            </div>
            <div className="flavor-traits-section">
                flavor traits will change here 
            </div>
            <div className="ingredient-selectors-section">
                {ingredientChoicesSectionContents}
            </div>
        </div>
    </>
}