import { useNavigate } from "react-router-dom"
import "./CreateCocktail.css"
import { useEffect, useState } from "react"
import { IoStar } from "react-icons/io5";
import { LuEqual, LuChevronsRight } from "react-icons/lu";
import { ChangeTemplateMenu } from "./ChangeTemplateMenu"; 
import { FilteredIngredientsDisplay } from "./FilteredIngredientsDisplay";
import { HandlePostCocktailAndIngredients } from "./HandlePostCocktail";
import loadingIcon from "../images/Blinking squares.gif"
import cocktailGif from "../images/cocktail-gif.gif"

import { Button, Modal } from 'antd';
// import "antd/dist/antd.css";


export const CreateCocktail = ({classicCocktailsProp, chosenClassicProp, setChosenClassicProp, favoritesProp, ingredientsProp, userIngredientsProp, chimeraUserObjProp, keywordsProp, fetchUserIngredientsProp, fetchCraftCocktailsProp}) => {
    const navigate = useNavigate()
    
    const [chosenClassicPropIngredients, setChosenClassicPropIngredients] = useState([])
    const [ingredientChoices, setIngredientChoices] = useState([])
    const [ingredientChoicesSectionContents, setIngredientChoicesSectionContents] = useState(null)
    const [flavorTraitsSectionContents, setFlavorTraitsSectionContents] = useState(null)
    const [filteredIngredientsSectionContents, setFilteredIngredientsSectionContents] = useState(null)
    const [filteringIngredient, setFilteringIngredient] = useState(null)
    const [middleSubtitle, setMiddleSubtitle] = useState('')
    const [ingredientClicked, setIngredientClicked] = useState(false)
    const [showNewIngredientsModal, setShowNewIngredientsModal] = useState(false);
    const [showNewCocktailModal, setShowNewCocktailModal] = useState(false);
    const [finishedPosting, setFinishedPosting] = useState(true)
    const [newCocktail, setNewCocktail] = useState({
        userId: chimeraUserObjProp.id,
        name: '',
        description: '',
        dateCreated: ''
    })

    console.log('whole component has rerendered')

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
        //every time chosenClassicProp is changed, reset everything.
        setNewCocktail({
            userId: chimeraUserObjProp.id,
            name: '',
            description: '',
            dateCreated: ''
        })

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

                return <button className="grey-button ingredient-choice-button" key={`ingredient-choice-${classicIngredient.id}`} 
                    onClick={(event) => {
                        event.preventDefault()
                        setFilteringIngredient(classicIngredient)
                        setIngredientClicked(true)
                    }}
                    >{ingredientChoices[classicIngredientIndex].name}</button>
            })

            setIngredientChoicesSectionContents(ingredientButtonsJSX)
        }

        if (chosenClassicProp && ingredientChoices.length) {
            setFlavorTraitsSectionContents(cocktailIngredientRows())
        }

    },[ingredientChoices]
    )

    useEffect(() => {
        //enable or disable save button 
        let matchingChoices = []

        for (let i = 0; i < ingredientChoices.length; i++) {
            if (ingredientChoices[i] === chosenClassicPropIngredients[i]) {
                matchingChoices.push(ingredientChoices[i])
            }
        }

        if (matchingChoices.length === chosenClassicPropIngredients.length) {
            document.querySelector(".save-new-cocktail-button").disabled = true;
        } else {
            if (newCocktail.name && newCocktail.description) {
                document.querySelector(".save-new-cocktail-button").disabled = false;
            } else {
                document.querySelector(".save-new-cocktail-button").disabled = true;
            }
        }

    },[ingredientChoices, newCocktail]
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
                setMiddleSubtitle('Ingredients and Flavor Traits')
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
                document.querySelector(".template-change-button").disabled = false;
            } else if (middleSubtitle === 'Choose a Template') {
                document.querySelector(".change-template-menu").style.visibility = "visible"
                document.querySelector(".flavor-traits-container").style.visibility = "hidden"
                document.querySelector(".template-change-button").disabled = true;
            }
        }
    }, [middleSubtitle]
    )

    const filteredIngredientsComponent = () => {
        return <FilteredIngredientsDisplay
            filteringIngredientProp={filteringIngredient}
            userIngredientsProp={userIngredientsProp}
            setIngredientClickedProp={setIngredientClicked}
            keywordsProp={keywordsProp}
            ingredientChoicesProp={ingredientChoices}
            setIngredientChoicesProp={setIngredientChoices}
            chosenClassicProp={chosenClassicProp}
            chosenClassicPropIngredientsProp={chosenClassicPropIngredients}
            
            />
    }

    useEffect(() => {
        console.log(`finished posting: ${finishedPosting}`)
    },[finishedPosting]
    )

    //Map a section for each ingredient containing 3 rows
    //for each ingredient in chosenClassicProp, create a row
    //then, inside the row, do 3 rows. Populate the name of ingredient (H4?) in the top row, the 2nd row will hold each flavor keyword that will stay, and 3rd row will hold flavors that will change

    //match chosenClassicProp to Ingredient Keywords: 
    const cocktailIngredientRows = () => {
        
        return <>
        {
            //map over each ingredient of chosenClassicProp
            chosenClassicPropIngredients.map(classicsIngredient => {
                //find the index of the classic ingredient and get the ingredient choice at same index.
                const classicIngredientIndex = chosenClassicPropIngredients.indexOf(classicsIngredient)

                let correspondingIngredientChoice = ingredientChoices[classicIngredientIndex]

                //see if the ingredient choice is currently set to that classicsIngredient
                //if it is, then the ingredientChoicePrimaryObj is the same as classicsIngredient
                 // if not, find it
                // classicsIngredient === ingredientChoices[classicIngredientIndex]
                //     ? ingredientChoicePrimaryObj = classicsIngredient
               
                //     : ingredientChoicePrimaryObj = ingredientsProp.find(primaryIngredient => primaryIngredient.name === ingredientChoices[classicIngredientIndex].name)

            //Only look at the keywords if the ingredient is not a garnish
                if (!classicsIngredient.isGarnish) {
                    
                    let correspondingChoiceKeywords = null
                    
                    //see if the ingredient choice is currently set to that classicsIngredient
                    //set correspondingChoiceKeywords depending on that
                    classicsIngredient === ingredientChoices[classicIngredientIndex]
                    ? correspondingChoiceKeywords = classicsIngredient.ingredientKeywords

                    : correspondingChoiceKeywords = ingredientChoices[classicIngredientIndex].userIngredientKeywords

                    const classicsIngredientKeywords = classicsIngredient.ingredientKeywords;

                    let losing = [];
                    let gaining = [];
                    let matches = [];

                    //filter for matching, gaining and losing 
                    for (let i = 0; i < correspondingChoiceKeywords.length; i++) {

                        const check = classicsIngredientKeywords.find(classicKeyword => {
                            return classicKeyword.keywordId === correspondingChoiceKeywords[i].keywordId
                        });

                        if (check) {
                            if (!matches.includes(check)) {
                                matches.push(check);
                            }
                        }

                        // losing = filteringIngredientKeywords.filter(
                        //     (i) => !userIngredientKeywords.includes(i)
                        // );

                        losing = classicsIngredientKeywords.filter(classicKeyword => {
                            return !correspondingChoiceKeywords.find(choiceKeyword => {
                                return classicKeyword.keywordId === choiceKeyword.keywordId
                            })
                        })

                        gaining = correspondingChoiceKeywords.filter(choiceKeyword => {
                            return !classicsIngredientKeywords.find(classicKeyword => {
                                return choiceKeyword.keywordId === classicKeyword.keywordId
                            })
                        })
                    }

                    return <section key={`ingredient-row--${classicsIngredient.id}`} className="ingredient-row">
                        <div className="ingredient-card classic-ingredient-card">
                            <h4 className="ingredient-subtitle">{classicsIngredient.name}</h4>
                            <div className="sub-row classic-sub-row classic-matching-keywords">
                                {
                                    matches.map((matchKeyword) => {
                                        const keywordPrimaryObj = keywordsProp.find(primaryKeyword => primaryKeyword.id === matchKeyword.keywordId)

                                        return <button className="classic-keyword classic-matching-keyword">{keywordPrimaryObj.name}</button>
                                    })
                                }
                            </div>
                            <hr className="fading-horizontal-line" />
                            <div className="sub-row classic-sub-row classic-changing-keywords">
                                {
                                    losing.map((losingKeyword) => {
                                        const keywordPrimaryObj = keywordsProp.find(primaryKeyword => primaryKeyword.id === losingKeyword.keywordId)

                                        //look at the classickeywords at index of choice keyword
                                        const losingClassicKeywordIndex = classicsIngredientKeywords.indexOf(losingKeyword)

                                        if (correspondingChoiceKeywords[losingClassicKeywordIndex]) {
                                            return <button className="classic-keyword classic-losing-keyword red-keyword">{keywordPrimaryObj.name}</button>
                                        } else {
                                            return <button className="classic-keyword classic-losing-keyword orange-strike-keyword">{keywordPrimaryObj.name}</button>
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <div className="icon-column">
                            <div className="icon-spacer-top"></div>
                            <LuEqual className="middle-icons equal-icon"/>
                            {
                                losing.length && gaining.length
                                ? <LuChevronsRight className="middle-icons arrow-icon"/>
                                : <div className="arrow-spacer"/>
                            }
                        </div>
                        <div className="ingredient-card choice-ingredient-card">
                            <h4 className="ingredient-subtitle">{correspondingIngredientChoice.name}</h4>
                            <div className="sub-row choice-sub-row choice-matching-keywords">
                                {
                                    matches.map((matchKeyword) => {
                                        const keywordPrimaryObj = keywordsProp.find(primaryKeyword => primaryKeyword.id === matchKeyword.keywordId)

                                        return <button className="choice-keyword choice-matching-keyword">{keywordPrimaryObj.name}</button>
                                    })
                                }
                            </div>
                            <hr className="fading-horizontal-line" />
                            <div className="sub-row choice-sub-row choice-changing-keywords-row">
                                {
                                    gaining.map((gainingKeyword) => {
                                        const keywordPrimaryObj = keywordsProp.find(primaryKeyword => primaryKeyword.id === gainingKeyword.keywordId)
                                        //look at the classickeywords at index of choice keyword
                                        const choiceGainingKeywordIndex = correspondingChoiceKeywords.indexOf(gainingKeyword)
                                        
                                        //if keyword exists at same index, return the keyword in red.
                                        if (classicsIngredientKeywords[choiceGainingKeywordIndex]) {
                                            return <button className="choice-keyword choice-gaining-keyword red-keyword">{keywordPrimaryObj.name}</button>
                                        } else {
                                        //if keyword does not exist at that index, show it in orange
                                            return <button className="choice-keyword choice-gaining-keyword orange-keyword">{keywordPrimaryObj.name}</button>
                                        }                                       
                                    })
                                }
                                {
                                    losing.map(losingKeyword => {
                                        const keywordPrimaryObj = keywordsProp.find(primaryKeyword => primaryKeyword.id === losingKeyword.keywordId)

                                        const losingClassicKeywordIndex = classicsIngredientKeywords.indexOf(losingKeyword)

                                        if (!correspondingChoiceKeywords[losingClassicKeywordIndex]) {
                                            return <button className="choice-keyword choice-gaining-keyword empty-keyword">{'⎯'.repeat(keywordPrimaryObj.name.length)}</button>
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </section>
                } else {
                    //If isGarnish === true, return the garnish ingredient format
                    return <section key={`ingredient-row--${classicsIngredient.id}`} className="ingredient-row">
                        <div className="ingredient-card classic-ingredient-card">
                            <h4 className="ingredient-subtitle">{classicsIngredient.name}</h4>
                            <div className="sub-row garnish-sub-row">
                                <p>(Garnish)</p>
                            </div>
                        </div>
                        <div className="icon-column">
                            {
                                classicsIngredient.name === correspondingIngredientChoice.name
                                ? <LuEqual className="middle-icons equal-icon"/>
                                : <LuChevronsRight className="middle-icons arrow-icon"/>
                            }
                        </div>
                        <div className="ingredient-card choice-ingredient-card">
                            <h4 className="ingredient-subtitle">{correspondingIngredientChoice.name}</h4>
                            <div className="sub-row garnish-sub-row">
                                <p>(Garnish)</p>
                            </div>
                        </div>
                    </section>
                    
                }
            })
        }
        </>
    }

     //imported modal function
    const newCocktailAndIngredientsModal = () => {
    
    const handleOk = (event) => {
        setFinishedPosting(false)

        HandlePostCocktailAndIngredients(ingredientChoices, chimeraUserObjProp, newCocktail, chosenClassicProp, setShowNewIngredientsModal, setFinishedPosting, navigate, userIngredientsProp, fetchUserIngredientsProp, fetchCraftCocktailsProp)
    };
    
    const handleCancel = () => {
        setShowNewIngredientsModal(false);
    };

    return (<>
            {
                finishedPosting
                ? <Modal className="modal-warning cocktail-and-ingredients-modal" 
                    title="Wait!" 
                    open={showNewIngredientsModal} 
                    onOk={handleOk} 
                    onCancel={handleCancel}
                    >
                    <p>You are trying to create a cocktail with ingredients you have not yet added to My Ingredients. Would you like to add these ingredients to My Ingredients so this cocktail can be saved?</p>
                </Modal>
                : <Modal className="modal-icon" 
                    title="Basic Modal" 
                    open={showNewIngredientsModal} 
                    >
                    <img className="loading-icon" src={cocktailGif} alt="Loading"/>
                </Modal>
            }
        </>)
    };

    const newCocktailModal = () => {

        const handleOk = (event) => {
            setFinishedPosting(false)

            HandlePostCocktailAndIngredients(ingredientChoices, chimeraUserObjProp, newCocktail, chosenClassicProp, setShowNewIngredientsModal, setFinishedPosting, navigate, userIngredientsProp, fetchUserIngredientsProp, fetchCraftCocktailsProp)            
        };
      
        const handleCancel = () => {
          setShowNewCocktailModal(false);
        };
      
    return (<>
        {
            finishedPosting
            ? <Modal className="modal cocktail-modal" 
            title="Wait!" 
            open={showNewCocktailModal} 
            onOk={handleOk} 
            onCancel={handleCancel}
            >
            <p>Are you sure you would like to create this cocktail?</p>
        </Modal>
            : <Modal className="modal-icon" 
            title="Basic Modal" 
            open={showNewCocktailModal} 
            >
            <img className="loading-icon" src={cocktailGif} alt="Loading"/>
        </Modal>
        }
    </>)
    };

    const chosenIsFavorite = favoritesProp.find(favorite => chosenClassicProp?.id === favorite.cocktailId)

    return <>
        <h2 className="create-cocktail-header">Create a Cocktail</h2>
        <div className="create-cocktail-container">
            {/* insert the change template menu to be shown/hidden */}
            <ChangeTemplateMenu 
                favoritesProp={favoritesProp} 
                classicCocktailsProp={classicCocktailsProp}
                chosenClassicProp={chosenClassicProp}
                setChosenClassicProp={setChosenClassicProp}
                setMiddleSubtitleProp={setMiddleSubtitle}
                middleSubtitleProp={middleSubtitle}
                setIngredientClickedProp={setIngredientClicked}
                userIngredientsProp={userIngredientsProp}
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
                                        setIngredientClicked(false)
                                    }
                                }>Change</button>
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
                        <button type="button" className="main-button save-new-cocktail-button" 
                            onClick={(event) =>{
                                //get an array of all ingredientChoices that are not in userIngredients
                                const ingredientsNotPresent = ingredientChoices.filter((ingredientChoice) => {
                                    return !userIngredientsProp.find(userIngredient => userIngredient.name === ingredientChoice.name)
                                })

                                if (ingredientsNotPresent.length) {
                                    setShowNewIngredientsModal(true)
                                } else {
                                    setShowNewCocktailModal(true) 
                                }
                            }}
                        >Save Cocktail</button>
                        
                        {/* Extra Button */}
                        {/* <button type="button" 
                            className=""
                            onClick={() => {
                    
                            }}
                        ></button> */}
                    </div>
                    </form>
                    <div className="new-cocktail-modal-container">{newCocktailModal()}</div>
                    <div className="new-cocktail-and-ingredients-modal">{newCocktailAndIngredientsModal()}</div>
                </div>
            </div>
        </div>
    </>
}
//------------------------------------------------------------------------------------------------------


