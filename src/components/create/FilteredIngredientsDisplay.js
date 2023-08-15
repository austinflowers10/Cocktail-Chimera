import { BsCheckCircleFill,BsCircleFill ,BsPlusCircleFill, BsFillDashCircleFill, BsSlashCircle, BsSortUp } from "react-icons/bs";
import { GrUndo } from "react-icons/gr";
import { PiCheckCircleFill, PiCaretCircleUpFill, PiCaretCircleDownFill, PiCaretCircleUpDownFill } from "react-icons/pi";
import { TbArrowsExchange2 } from "react-icons/tb";
import { MdClear, MdFilterListOff} from "react-icons/md";
import { useEffect, useState } from "react";

export const FilteredIngredientsDisplay = ({filteringIngredientProp, userIngredientsProp, setIngredientClickedProp, ingredientChoicesProp, setIngredientChoicesProp, chosenClassicProp, chosenClassicPropIngredientsProp}) => {
    const [filterNumber, setFilterNumber] = useState(1)
    const [filterIcon, setFilterIcon] = useState(<BsSortUp className="sort-number-up"/>)


    useEffect(() => {
        if (filterNumber === 0) {
            setFilterIcon(<MdFilterListOff className="filter-off"/>)
        } else {
            setFilterIcon(<BsSortUp className="sort-number-up"/>)
        }
    },[filterNumber]
    )
    // console.log(filteringIngredientProp)
    //when displaying each ingredient option, loop over that array and append a green dot in the display of that ingredient button. if it doesn't, do a yellow dot if the trait is a different trait, or an unfilled dot if there is no trait in that spot

    //loop through all userIngredients. For each one, look at each ingredientKeyword and see if the filteringIngredientProp has that keyword on it
    return <div className="filtered-ingredients-list-menu">
        {/* header with name of ingredient and exchange Icon */}
        <div className="filtered-ingredients-header-row">
            <button className="ingredient-menu-icons undo-ingredient-menu-button"
                onClick={(event) => {
                    const filteringIngredientIndex = chosenClassicPropIngredientsProp.indexOf(filteringIngredientProp)

                    const copy = [...ingredientChoicesProp]
                    copy[filteringIngredientIndex] = filteringIngredientProp

                    setIngredientChoicesProp(copy)
                    setIngredientClickedProp(false)
                }}
            >
                <GrUndo className="undo-ingredient-menu-icon"/>
            </button>
            <h3 className={"filtered-ingredient-menu-header"}>{filteringIngredientProp.name}</h3>
            <button
                className="ingredient-menu-icons sort-number-up-button"
                onClick={(event) => {
                    if (filterNumber < 3) {
                        setFilterNumber(filterNumber + 1);
                    } else if (filterNumber === 3) {
                        setFilterNumber(0);
                    }
                }}
            >
                {filterIcon}
            </button>
            <button 
                className="ingredient-menu-icons x-ingredient-menu-icon-button"
                onClick={(event) => {
                    setIngredientClickedProp(false)
                }}
            >
                <MdClear className="x-ingredient-menu-icon"/>
            </button>

        </div>
        {/* list of ingredient option buttons */}
        <div className="filtered-ingredients-buttons-section">
            {
            //loop through all userIngredients. For each one, look at each ingredientKeyword and compare it to the corresponding keyword in filteringIngredientProp 
                [...userIngredientsProp].map((userIngredient) => { 
                    if (userIngredient.name !== filteringIngredientProp.name) {
                    
                    const userIngredientKeywords = userIngredient.userIngredientKeywords;                    
                    const filteringIngredientKeywords = filteringIngredientProp.ingredientKeywords;
                    // console.log(userIngredient)
                    // console.log(filteringIngredientKeywords)

                    if (userIngredientKeywords.length && filteringIngredientKeywords.length) {
                        //matching: filled green
                        const greenDot = <PiCheckCircleFill className="dot green-dot"/>
                        //changing: filled red
                        const redDot = <PiCaretCircleUpDownFill className="dot red-dot"/>
                        //losing: yellow minus
                        const yellowMinusDot = <PiCaretCircleDownFill className="dot yellow-minus-dot"/>
                        //gaining: yellow plus
                        const yellowPlusDot = <PiCaretCircleUpFill className="dot yellow-plus-dot"/>

                        const greenDotArr = []
                        const redDotArr = []
                        const yellowMinusDotArr = []
                        const yellowPlusDotArr = []

                        const combinedDotsArr = []
                        
                        let losing = [];
                        let gaining = [];
                        let matches = [];

                        //filter for matching, gaining and losing 
                        for (let i = 0; i < userIngredientKeywords.length; i++) {
                            const check = filteringIngredientKeywords.find(filterKeyword => {
                                return filterKeyword.keywordId === userIngredientKeywords[i].keywordId
                            });

                            if (check) {
                                if (!matches.includes(check)) {
                                    matches.push(check);
                                }
                            }

                            // losing = filteringIngredientKeywords.filter(
                            //     (i) => !userIngredientKeywords.includes(i)
                            // );

                            losing = filteringIngredientKeywords.filter(filterKeyword => {
                                return !userIngredientKeywords.find(userKeyword => {
                                    return filterKeyword.keywordId === userKeyword.keywordId
                                })
                            })

                            gaining = userIngredientKeywords.filter(userKeyword => {
                                return !filteringIngredientKeywords.find(filterKeyword => {
                                    return userKeyword.keywordId === filterKeyword.keywordId
                                })
                            })
                        }

                    //Green Dots
                        //if matches exist, add green dots for the number of matches
                        if (matches.length) {
                            matches.forEach(keyword => greenDotArr.push(greenDot))
                        }

        //filter by filterNumber
                        if (greenDotArr.length >= filterNumber) {
                    
                    //Yellow Dots
                        const diff = gaining.length - losing.length;

                        //add a plus dot if diff is > 0 
                        if (diff > 0) {
                            for (let i = 0; i < diff; i++) {
                                yellowPlusDotArr.push(yellowPlusDot)
                            }
                        }

                        //add a minus dot if diff is < 0
                        if (diff < 0) {
                            for (let i = 0; i < Math.abs(diff); i++) {
                                yellowMinusDotArr.push(yellowMinusDot)
                            }
                        }
                        

                    //Red Dots - push red dots up to the length of the smaller array
                        if (diff === 0) {
                            // gaining.length times - both lengths are the same
                            gaining.forEach(keyword => redDotArr.push(redDot));
                        } else if (gaining.length > losing.length) {
                            // losing.length times - losing is smaller
                            losing.forEach(keyword => redDotArr.push(redDot));
                        } else if (losing.length > gaining.length) {
                            // gaining.length times - gaining is smaller
                            gaining.forEach(keyword => redDotArr.push(redDot));
                        }
                    
                    //Now that all arrays have been built, check if each exists and combine if yes

                        if (greenDotArr.length) {
                            //push green dots first
                            combinedDotsArr.push(greenDotArr)
                        }
                        if (redDotArr.length) {
                            //push red dots second
                            combinedDotsArr.push(redDotArr)
                        }

                        if (yellowPlusDotArr.length) {
                            //push gaining dots third 
                            combinedDotsArr.push(yellowPlusDotArr)
                        }

                        if (yellowMinusDotArr.length) {
                            //push losing dots fourth
                            combinedDotsArr.push(yellowMinusDotArr)
                        }
                        
                        //convert to JSX
                        const combinedDotsJSX = combinedDotsArr.map(dotObj => dotObj)

                        const greenDotCount = greenDotArr.length

                        const userIngredientButton = <button 
                            key={`ingredient-option-button--${userIngredient.id}`}
                            className="grey-button ingredient-option-button"
                            onClick={(event) => {
                                const filteringIngredientIndex = chosenClassicPropIngredientsProp.indexOf(filteringIngredientProp)

                                const copy = [...ingredientChoicesProp]
                                copy[filteringIngredientIndex] = userIngredient

                                setIngredientChoicesProp(copy)
                                setIngredientClickedProp(false)
                            }}
                        ><p>{userIngredient.name}</p><div>{combinedDotsJSX}</div></button>

                        return {userIngredientButton, greenDotCount}
                        }
                    } else if (!userIngredientKeywords.length && !filteringIngredientKeywords.length) {
                        const greenDotCount = 0 

                        const userIngredientButton = <button 
                            key={`ingredient-option-button--${userIngredient.id}`}
                            className="grey-button ingredient-option-button"
                            onClick={(event) => {
                                const filteringIngredientIndex = chosenClassicPropIngredientsProp.indexOf(filteringIngredientProp)

                                const copy = [...ingredientChoicesProp]
                                copy[filteringIngredientIndex] = userIngredient

                                setIngredientChoicesProp(copy)
                                setIngredientClickedProp(false)
                            }}
                        ><p>{userIngredient.name}</p><div><BsSlashCircle className="dot slash-dot"/></div></button>

                        return {userIngredientButton, greenDotCount}
                    }

                    }
                })
                .filter(userObj => userObj !== undefined)
                .sort((a, b) => b.greenDotCount - a.greenDotCount)
                .map(userObj => userObj.userIngredientButton)
                
            }
        </div>
    </div>
}


// const userIngredientsKeywords = ["spiced", "bold", "complex", "oaky"];
// const filteringIngredients = ["rich", "bold", "complex", "oaky"];


// const losingArray = userIngredientsKeywords.filter(keyword => !filteringIngredients.includes(keyword));


// const gainingArray = filteringIngredients.filter(keyword => !userIngredientsKeywords.includes(keyword));

// console.log("Losing array:", losingArray);
// console.log("Gaining array:", gainingArray);


//----------------------------Greg's console.logs-------------------------------
                        // console.log("Matches: ", matches);
                        // console.log("Gaining: ", gaining);
                        // console.log("Losing: ", losing);

                        

                        // console.log(`Losing: ${losing}  ${losing.length} Gaining: ${gaining} ${gaining.length}`);

                        // console.log(`Green: ${matches.length}
                        // Red: ${
                        // diff === 0
                        //     ? gaining.length
                        //     : gaining.length >= losing.length
                        //         ? losing.length
                        //         : losing.length >= gaining.length
                        //             ? gaining.length
                        //             : 0
                        // }
                        // Yellow (+): ${diff > 0 ? diff : ""}
                        // Yellow (-): ${diff < 0 ? Math.abs(diff) : ""}`);