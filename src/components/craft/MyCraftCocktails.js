import { useNavigate } from "react-router-dom"
import "./MyCraftCocktails.css"
import { useEffect, useState } from "react"
import cocktailGif from "../images/cocktail-gif.gif"

export const MyCraftCocktails = ({userCraftCocktailsProp, userIngredientsProp, fetchCraftCocktailsProp}) => {
    const [craftDescriptionContainerContents, setCraftDescriptionContainerContents] = useState(null);
    const [craftDescriptionAreaContents, setCraftDescriptionAreaContents] = useState(null);
    const [nameAreaContents, setNameAreaContents] = useState(null)
    const [craftToView, setCraftToView] = useState(null)
    const [edit, setEdit] = useState(false)
    // const [showSpinner, setShowSpinner] = useState(null)

    useEffect(() => {
        fetchCraftCocktailsProp()
    },[]
    )

    const navigate = useNavigate()
    const [craftToUpdate, setCraftToUpdate] = useState({
        name: '',
        description: ''
    })

    useEffect(() => {
        if (craftToView) {
            setCraftToUpdate(craftToView)
        }
    },[craftToView]
    )
    useEffect(() => {

        //set initial description section contents upon initial render
        if (!craftToView) {
            setCraftDescriptionContainerContents(<p>Please choose a cocktail to view</p>)
            document.querySelector('.craft-description-container').style.display = "none"
        } else {
            // console.log([...craftToView.userCocktailIngredients])
            // console.log([...craftToView])
            document.querySelector('.craft-description-container').style.display = "flex"
            //change description section comments when a button click changes craft to view
            setCraftDescriptionContainerContents(
                <>
                    <div className="craft-description-subtitle-row">
                        {nameAreaContents}
                    </div>
                    <div className="craft-ingredients-container">
                        <div className="craft-ingredients-buttons-section">
                            {
                                craftToView.userCocktailIngredients.map(craftIngredient => {
                                    const matchingUserIngredient = userIngredientsProp.find(userIngredient => {
                                        return userIngredient.id === craftIngredient.userIngredientId
                                    })
                                    
                                    return <button className="craft-ingredient-button">
                                        {matchingUserIngredient.name}
                                    </button>
                                })

                            }
                        </div>
                    </div>
                    <div className="craft-description-section">
                            {craftDescriptionAreaContents}
                    </div>
                    <div className="craft-buttons-row">
                        <button className="craft-buttons craft-edit-button"
                            onClick={(event) => {
                                setEdit(true)
                            }
                        }
                        >Edit</button>
                        <button className="craft-cancel-button" 
                            onClick={(event) => {
                                setEdit(false)
                            }}
                        >Cancel</button>
                        <button className="craft-update-button"
                            onClick = {(event) => {
                                handleEditCraftCocktail()
                                setEdit(false)
                            }}
                            >Update</button>
                        <button className="craft-delete-button" onClick={(event) => {
                            event.preventDefault()
                            return fetch(`http://localhost:8088/userCocktails/${craftToView.id}`, { method: "DELETE" })
                                .then(() => {
                                    setCraftToView(null)
                                })
                                .then(fetchCraftCocktailsProp)
                        }}
                        >Delete</button>
                    </div>
                </>
            )
        }
    },[craftToView, craftDescriptionAreaContents]
    )

    const handleEditCraftCocktail = () => {

    return fetch(`http://localhost:8088/userCocktails/${craftToView.id}`, {
        method: "PUT",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(craftToUpdate)
    })
    .then(response => response.json())
    .then((updatedCocktail) => {
        setCraftToView(updatedCocktail)
    })
    .then(fetchCraftCocktailsProp)
    }

    useEffect(() => {
        if (edit) {
            setCraftDescriptionAreaContents(
                <div className="edit-cocktail-description">
                    <h3 className="craft-description-subtitle">Recipe Description:</h3>
                    <textarea
                        className="edit-cocktail-description-input"
                        placeholder="Edit Cocktail Recipe"
                        value={craftToUpdate.description}
                        onChange={(event) => {
                            const copy = { ...craftToUpdate };
                            copy.description = event.target.value;
                            setCraftToUpdate(copy);
                        }}
                        />
                </div>
            )

            setNameAreaContents(
                <div className="edit-cocktail-name">
                    <h4 className="edit-cocktail-name-subtitle">Name:</h4>
                    <input
                        autoFocus
                        type="text"
                        className="edit-cocktail-name-input"
                        placeholder="Edit Cocktail Name"
                        value={craftToUpdate.name}
                        onChange={
                            (event) => {
                                const copy = { ...craftToUpdate };
                                copy.name = event.target.value;
                                setCraftToUpdate(copy);
                            }
                        } />
                </div>
            )

            if (!craftToUpdate.name || !craftToUpdate.description) {
                document.querySelector(".craft-update-button").disabled = true;
            } else {
                document.querySelector(".craft-update-button").disabled = false;
                
            }


        } else {
            if (craftToView) {
                setCraftDescriptionAreaContents(
                    <div className="craft-cocktail-description">
                        <h3 className="craft-description-subtitle">Recipe Description:</h3>
                        <p className="craft-description">{craftToView.description}</p>
                    </div>
                )
                
                setNameAreaContents(<h3 className="craft-subtitle craft-subtitle-name">{craftToView.name}</h3>)
            } 
        }
        //may need to set display properties in the next use effect checking craft area contents
    }, [edit, craftToUpdate]
    )

    useEffect(() => {
        if (craftDescriptionAreaContents) {
            if (edit) {
                document.querySelector('.craft-edit-button').style.display = 'none'
                document.querySelector('.craft-update-button').style.display = 'block'
                document.querySelector('.craft-cancel-button').style.display = 'block'
                document.querySelector('.craft-delete-button').style.display = 'block'

            } else {
                document.querySelector('.craft-edit-button').style.display = 'block'
                document.querySelector('.craft-update-button').style.display = 'none'
                document.querySelector('.craft-cancel-button').style.display = 'none'
                document.querySelector('.craft-delete-button').style.display = 'none'
            }
        }
    },[edit, craftDescriptionAreaContents]
    )

    return <>
    <h2 className="craft-header">My Craft Cocktails</h2>
    <div className="craft-container">
        <div className="craft-buttons-container">
            {
                userCraftCocktailsProp.length
                ? <>
                <div className="craft-options-subtitle-row">
                    <h3 className="craft-subtitle craft-subtitle-choose">Choose a Craft Cocktail</h3>
                </div>
                <div className="craft-buttons-section">
                    {
                        userCraftCocktailsProp.map((craftCocktail) => {
                            return <div key={`craft-button-row--${craftCocktail.id}`} className="craft-button-row">
                            <button 
                                key={`craft-button--${craftCocktail.id}`} 
                                className="craft-button" 
                                id={`craft-button--${craftCocktail.id}`}
                                onClick={(event) => {
                                        //update shared state object when a button is clicked
                                        setCraftToView(craftCocktail)
                                        // console.log([craftCocktail])
                                    }}
                                >{craftCocktail.name}</button>
                            </div>
                        })
                    }
                </div>
                </>
                : <>
                <div className="craft-options-subtitle-row">
                    <h3 className="craft-subtitle craft-subtitle-choose"></h3>
                </div>
                <div className="craft-redirect-prompt-container">
                    <p>You have not yet saved any Craft Cocktails</p>
                    <div className="craft-redirect-button-row">
                        <button className="orange-button craft-redirect-button"
                            onClick={() => {navigate("/create-cocktail")}}
                        >Create a Cocktail</button>
                    </div>
                </div>
                </>
            }
        </div>

        <div className="craft-description-container">
            {/* render prompt or render entire description container contents */}
            {craftDescriptionContainerContents}
        </div>
    </div>
    </>
}
