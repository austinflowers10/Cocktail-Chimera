import { HiOutlineMinusCircle, HiPlusCircle } from "react-icons/hi2";
import { GoDotFill } from "react-icons/go";
import { TbArrowsExchange2 } from "react-icons/tb";
// import { BiUndo } from "react-icons/bi";
import { MdClear, MdUndo } from "react-icons/md";

export const FilteredIngredientsDisplay = ({filteringIngredientProp, userIngredientsProp, setIngredientClickedProp}) => {

    console.log(filteringIngredientProp)
    //when displaying each ingredient option, loop over that array and append a green dot in the display of that ingredient button. if it doesn't, do a yellow dot if the trait is a different trait, or an unfilled dot if there is no trait in that spot

    //loop through all userIngredients. For each one, look at each ingredientKeyword and see if the filteringIngredientProp has that keyword on it
    return <div className="filtered-ingredients-list-menu">
        {/* header with name of ingredient and exchange Icon */}
        <div className="filtered-ingredients-header-row">
            <MdUndo className="ingredient-menu-icons undo-ingredient-menu-button"/>
            <h3 className={"filtered-ingredient-menu-header"}>{filteringIngredientProp.name}</h3>
            <MdClear className="ingredient-menu-icons x-ingredient-menu-button"
                onClick={(event) => {
                    setIngredientClickedProp(false)
                }}
            />
        </div>
        {/* list of ingredient option buttons */}
        <div className="filtered-ingredients-buttons-section">
            {
            //loop through all userIngredients. For each one, look at each ingredientKeyword and compare it to the corresponding keyword in filteringIngredientProp 
                userIngredientsProp.map((userIngredient) => {  
                        
                        const userIngredientKeywords = userIngredient.userIngredientKeywords;
                        const filteringIngredientKeywords = filteringIngredientProp.ingredientKeywords;
                        // console.log(userIngredient)
                        // console.log(filteringIngredientKeywords)

                        //matching: filled green
                        const greenDot = <GoDotFill className="dot green-dot"/>
                        //changing: filled red
                        const redDot = <GoDotFill className="dot red-dot"/>
                        //losing: yellow minus
                        const yellowMinusDot = <HiOutlineMinusCircle className="dot yellow-minus-dot"/>
                        //gaining: yellow plus
                        const yellowPlusDot = <HiPlusCircle className="dot yellow-plus-dot"/>

                        const greenDotArr = []
                        const redDotArr = []
                        const yellowMinusDotArr = []
                        const yellowPlusDotArr = []

                        const combinedDotsArr = []
                        
                        //make a loop that runs 4 times. each time, look at both sets of keywords and do different things depending each comparison.
                        for (let i = 0; i < 4; i++) {

                            //if both exist...
                            if (userIngredientKeywords[i] && filteringIngredientKeywords[i]) {
                                //if they match, add a green dot
                                if (userIngredientKeywords[i] === filteringIngredientKeywords[i]) {
                                    greenDotArr.push(greenDot)
                                //if they don't match, add a red dot
                                } else {
                                    redDotArr.push(redDot)
                                }
                            //if user keyword does not exist but filtered ingredient keyword does...
                            } else if (!userIngredientKeywords[i] && filteringIngredientKeywords[i]) {
                                //add a yellow minus empty dot
                                yellowMinusDotArr.push(yellowMinusDot)

                            //if user keyword exists but filtered ingredient keyword does not...
                            } else if (userIngredientKeywords[i] && !filteringIngredientKeywords[i]) {
                                //add a yellow plus dot
                                yellowPlusDotArr.push(yellowPlusDot)
                            }
                        }

                        if (greenDotArr.length) {
                            combinedDotsArr.push(greenDotArr)
                        }
                        if (redDotArr.length) {
                            combinedDotsArr.push(redDotArr)
                        }
                        if (yellowMinusDotArr.length) {
                            combinedDotsArr.push(yellowMinusDotArr)
                        }
                        if (yellowPlusDotArr.length) {
                            combinedDotsArr.push(yellowPlusDotArr)
                        }

                        const combinedDotsJSX = combinedDotsArr.map(dotObj => dotObj)

                        return <button 
                            key={`ingredient-option-button--${userIngredient.id}`}
                            className="ingredient-option-button"
                            onClick={(event) => {
                                
                            }}
                        >{userIngredient.name}{combinedDotsJSX}</button>
                    
                })
            }
        </div>
    </div>
}