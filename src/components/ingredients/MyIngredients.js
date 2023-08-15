import { useEffect, useState } from "react"
import "./MyIngredients.css"
import { KeywordSelectorsDisplay } from "./KeywordSelectorsDisplay"
import { AddIngredientsFormDisplay } from "./AddIngredientsFormDisplay"
import { MyIngredientsListDisplay } from "./MyIngredientsListDisplay"
import { MdOutlineCancel } from "react-icons/md";
import { RadioIngredientsDisplay } from "./RadioIngredientsDisplay"


export const MyIngredients = ({chimeraUserObjProp, ingredientsProp, userIngredientsProp, fetchUserIngredientsProp, keywordsProp}) => {
    const [myIngredientsSectionContents, setMyIngredientsSectionContents] = useState('')
    const [myIngredientsHeader, setMyIngredientsHeader] = useState('')
    const [userKeywordChoices, setUserKeywordChoices] = useState([])
    const [chosenKeywordsRowContent, setChosenKeywordsRowContent] = useState('')
    const [displayState, setDisplayState] = useState('')
    const [newIngredient, setNewIngredient] = useState({
            name: '',
            isGarnish: false,
            dateAdded: ''
        })

    //addIngredientsForm menu
    const addIngredientsFormComponent = () => {
        return <AddIngredientsFormDisplay
                setMyIngredientsHeaderProp={setMyIngredientsHeader}
                newIngredientProp={newIngredient}
                setNewIngredientProp={setNewIngredient}
                chosenKeywordsRowContentProp={chosenKeywordsRowContent}
                setMyIngredientsSectionContentsProp={setMyIngredientsSectionContents}
                handleAddIngredientButtonClickProp={handleAddIngredientButtonClick}
                userIngredientsProp={userIngredientsProp}
                setDisplayStateProp={setDisplayState}
                setUserKeywordChoicesProp={setUserKeywordChoices}
            />
    }

    //ingredients list menu
    const myIngredientsListComponent = () => {
        console.log("list refreshed")
        return <MyIngredientsListDisplay
                setMyIngredientsHeaderProp={setMyIngredientsHeader}
                userIngredientsProp={userIngredientsProp}
                fetchUserIngredientsProp={fetchUserIngredientsProp}
                setMyIngredientsSectionContentsProp={setMyIngredientsSectionContents}
                setDisplayStateProp={setDisplayState}
                setNewIngredientProp={setNewIngredient}
                setUserKeywordChoicesProp={setUserKeywordChoices}
                keywordsProp={keywordsProp}
            />
    }

    //keyword selectors menu
    const keywordSelectorsComponent = () => {
        // console.log('called keywords component function')
        // console.log(userKeywordChoices.length)
        return <KeywordSelectorsDisplay 
                setMyIngredientsSectionContentsProp={setMyIngredientsSectionContents}
                chosenKeywordsRowContentProp={chosenKeywordsRowContent}
                userKeywordChoicesProp={userKeywordChoices}
                setUserKeywordChoicesProp={setUserKeywordChoices}
                keywordsProp={keywordsProp}
                newIngredientProp={newIngredient}
                setDisplayStateProp={setDisplayState}

            />
    }

    const radioIngredientsComponent = () => {
        return <RadioIngredientsDisplay
                userIngredientsProp={userIngredientsProp}
                setDisplayStateProp={setDisplayState}
                setMyIngredientsSectionContentsProp={setMyIngredientsSectionContents}
                keywordsProp={keywordsProp}
                ingredientsProp={ingredientsProp}
                chimeraUserObjProp={chimeraUserObjProp}
                postUserKeywordJoinedObjectProp={postUserKeywordJoinedObject} 
                fetchUserIngredientsProp={fetchUserIngredientsProp}
            />
    }

    
    //handle click function here - post new ingredient and keywords and display ingredients list afterward
    //must contain the following properties:
    //userIngredients {
    //     id num - this will be added by json server
    //     userId num
    //     name str
    //     isGarnish bool 
    //     dateAdded: str 
    //   }
    //also need to add up to 4 ingredient keywords
    const handleAddIngredientButtonClick = (event) => {
        event.preventDefault()

        // console.log('You clicked the button')
    //only post if both of these exist
        if (userKeywordChoices.length && newIngredient.name) {

            //function to get date in MM-DD-YYYY
            const currentDate = new Date();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0');
            const day = String(currentDate.getDate()).padStart(2, '0');
            const year = currentDate.getFullYear();

            const formattedDate = `${month}-${day}-${year}`;

            const ingredientToSendToAPI = {
                userId: chimeraUserObjProp.id,
                name: newIngredient.name,
                isGarnish: newIngredient.isGarnish,
                dateAdded: formattedDate
            }

            //POST the ingredients to the API
            return fetch(`http://localhost:8088/userIngredients`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(ingredientToSendToAPI)
            })
                .then(response => response.json())
                .then((userIngredient) => {
            //loop through and give each one the correct format for the joined table
                    return userKeywordChoices.map(keyword => {
                        return {
                            userIngredientId: userIngredient.id,
                            keywordId: keyword.id
                        }
                    })
                })
                    .then(async (userKeywordJoinedObjects) => {
                        //POST the array of user keyword objects to the API
                        for (let keywordChoice of userKeywordJoinedObjects) {
                            await postUserKeywordJoinedObject(keywordChoice)
                            // .then(response => response.json())
                        }            
                    })
                    .then(fetchUserIngredientsProp)
                    

    //if name does not exist but keywords exist, highlight name
        } else if (!newIngredient.name && userKeywordChoices.length) {
            document.querySelector(".form-item-name").classList.add('highlighted')
            setTimeout(() => {
                document.querySelector(".form-item-name").classList.remove('highlighted');
            }, 500)
    //if keywords do not exist but name exists, highlight keyword row
        } else if (!userKeywordChoices.length && newIngredient.name) {
            document.querySelector(".choose-keyword-row").classList.add('highlighted')
            setTimeout(() => {
                document.querySelector(".choose-keyword-row").classList.remove('highlighted');
            }, 500)
    //if neither exist, highlight both
        } else {
            document.querySelector(".form-item-name").classList.add('highlighted')
            setTimeout(() => {
                document.querySelector(".form-item-name").classList.remove('highlighted');
            }, 500)

            document.querySelector(".choose-keyword-row").classList.add('highlighted')
            setTimeout(() => {
                document.querySelector(".choose-keyword-row").classList.remove('highlighted');
            }, 500)            
        }
    }          

    //post keywords array function
    const postUserKeywordJoinedObject = async (joinedObject) => {
         try {
            return fetch(`http://localhost:8088/userIngredientKeywords`, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(joinedObject)
        })
        } catch (error) {
            console.log(error)
        }
    }


    //display user choices as they are being selected. if none, show a prompt to select at least 1.
    useEffect(() => {
        userKeywordChoices.length
        ? setChosenKeywordsRowContent(
            <div className="chosen-keywords-row">
                {
                    userKeywordChoices.map(choice => {
                        // console.log(`keyword choices use effect${choice.name}`)
                        return <button className="keyword keyword-choice" key={`keyword-choice--${choice.id}`}>
                            {choice.name}
                            {/* add an x next to the name inside the button */}
                            <MdOutlineCancel className="keyword-x-buttons"  
                            onClick={(event) => {
                            //when x button clicked, setuserkeywordchoices to itself minus that one choice
                                setUserKeywordChoices(
                                    userKeywordChoices.filter(keyword => keyword.id !== choice.id)
                                ) 
                            }}/>
                        </button>
                    })
                }
            </div>
        )
        : setChosenKeywordsRowContent(<p className="choose-keyword-row">Please select at least 1 Flavor Trait</p>)

    }, [userKeywordChoices]
    )

    useEffect(() => {
        if (displayState === 'form' || displayState === 'selectors') {
            setMyIngredientsSectionContents(keywordSelectorsComponent())
        }
        
    },[chosenKeywordsRowContent]
    )

    useEffect(() => {
        if (displayState === 'form' || displayState === 'selectors') {
            if (userKeywordChoices.length) {
                const keywordXButtons = document.querySelectorAll('.keyword-x-buttons');
                for (const button of keywordXButtons) {
                    button.style.visibility = displayState === "selectors" ? "visible" : "hidden";
                }
            }
        }

        if (displayState === "list") {
            setNewIngredient({
                name: '',
                isGarnish: false,
                dateAdded: ''
            })
            setUserKeywordChoices([])
        }
    }, [myIngredientsSectionContents]);


    //if userIngredients.length === 0, set contents of ingredients section to show the radios immediately
    //else, show ingredients list
    useEffect(() => {
        if (displayState === '') {
            if (userIngredientsProp.length === 0) {
                setDisplayState('radio')
            } else {
                setDisplayState('list')
            }
        } else if (displayState === 'list') {
            if (userIngredientsProp.length === 0) {
                setDisplayState('radio')
            } else {
                //refresh ingredients list every time userIngredients changes
                setMyIngredientsSectionContents(myIngredientsListComponent())
            }            
        } else if (displayState === 'form' || displayState === "radio") {
            setDisplayState('list')
        }
    }, [userIngredientsProp]
    )

    //watch displayState and set the contents of the page based on the value
    useEffect(() => {
        if (displayState === "list") {
            setMyIngredientsSectionContents(myIngredientsListComponent())
            setMyIngredientsHeader('My Ingredients')
            setNewIngredient({
                name: '',
                isGarnish: false,
                dateAdded: ''
            })
        } else if (displayState === "form") {
            setMyIngredientsSectionContents(addIngredientsFormComponent())
            setMyIngredientsHeader('New Ingredient')
            
        } else if (displayState === "selectors") {
            setMyIngredientsSectionContents(keywordSelectorsComponent())
            // console.log('keywords use effect triggered')
        } else if(displayState === "radio") {
            setMyIngredientsSectionContents(radioIngredientsComponent())
            setMyIngredientsHeader('Add Ingredients')
        }
    },[displayState]
    )

    useEffect(() => {
        if (displayState === "radio") {
            setMyIngredientsSectionContents(radioIngredientsComponent())
        }

    },[ingredientsProp, keywordsProp]
    )

    //rerender the form every time newIngredient values change
    useEffect(() => {
        if (displayState === 'form') {
            setMyIngredientsSectionContents(addIngredientsFormComponent())
        }
    },[newIngredient]
    )

    //show ingredients list every time userIngredients changes 
    // useEffect(() => {
    //     setMyIngredientsSectionContents(myIngredientsListComponent())
    // },[userIngredientsProp]
    // )

    //Main Return Statement 
    return <>
        <div className="my-ingredients-container">
            <h2 className="my-ingredients-header">{myIngredientsHeader}</h2>
            {myIngredientsSectionContents}
        </div>
    </>

}

// setNewIngredient({
//     name: '',
//     isGarnish: false,
//     dateAdded: ''
// })
// setUserKeywordChoices([])