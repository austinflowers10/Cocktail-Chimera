import { useNavigate } from "react-router-dom"
import "./ClassicCocktails.css"
import { useEffect, useState } from "react"
import { IoStar } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";

export const ClassicCocktails = ( {classicCocktailsProp, chosenClassicProp, setChosenClassicProp, favoritesProp, fetchFavoritesProp, chimeraUserObjProp}  ) => {
    const [classicsDescriptionSectionContents, setClassicsDescriptionSectionContents] = useState(null);
    const navigate = useNavigate()

    //create a function to choose which star to show and to post or delete favorite upon star click 
    const starSwitcher = (chosenObj) => {
        const foundFavorite = favoritesProp.find(favorite => chosenObj.id === favorite.cocktailId)

        const favoriteToSendToAPI = {
            userId: chimeraUserObjProp.id,
            cocktailId: chosenObj.id
        }

        //return star filled or unfilled depending on whether foundFavorite is true or false
        return foundFavorite
            ? <IoStar className="big-star remove-favorite-icon" onClick={
                    (event) => {
                        fetch(`http://localhost:8088/userFavorites/${foundFavorite.id}`, { method: "DELETE" })
                            .then(fetchFavoritesProp)
                    }
                }/>
            : <IoStarOutline className="big-star add-favorite-icon" onClick={
                    (event) => {
                        fetch('http://localhost:8088/userFavorites', {
                            method: "POST",
                            headers: {
                                "Content-Type":"application/json"
                            },
                            body: JSON.stringify(favoriteToSendToAPI)
                        })
                            .then(response => response.json())
                            .then(fetchFavoritesProp)
                    }
                }/>
    }

    useEffect(() => {

         //set initial description section contents upon initial render
        !chosenClassicProp
        ? setClassicsDescriptionSectionContents(<p>Please choose a cocktail to view</p>)

        //change description section comments when a button click changes chosenClassicProp
        : setClassicsDescriptionSectionContents(
            <>
                <h3 className="classics-subtitle-name">{chosenClassicProp.name}</h3>
                <div className="classic-description-image-buttons">
                    <div className="image-container">
                        <img className="classics-image" src={chosenClassicProp.image}/>
                    </div>
                    <p className="classics-description">
                        {chosenClassicProp.description}
                    </p>
                    <div className="favorite-and-use-section">
            {/* interpolate function which will switch out the star */}
                        {starSwitcher(chosenClassicProp)}
                        <button className="use-classic-button"
                            onClick={(event) => {
                                navigate('/create-cocktail')
                            }
                        }
                        >Create a Cocktail</button>
                    </div>
                </div>
                </>
            )

            if (chosenClassicProp) {
                document.querySelector('.classics-description-section').style.display = "flex"
            } else {
                document.querySelector('.classics-description-section').style.display = "none"
            }
        },[chosenClassicProp, favoritesProp]
    )

//setChosenClassicProp when a button is clicked
//map over classicCocktails and put each as a button
    return <>
        <h2 className="classics-header">Classic Cocktails</h2>
        <div className="classics-container">
            <div className="classics-buttons-section-container">
                <h3 className="classics-subtitle-choose">Choose a Cocktail</h3>
                <div className="classics-buttons-section">
                    {
                        classicCocktailsProp.map((classic) => {
                            const isFavorite = favoritesProp.find(favorite => classic.id === favorite.cocktailId)
                
                            if (isFavorite) {  
                                return <div key={`button-row--${classic.id}`} className="button-row">
                                <IoStar className="little-star"/>
                                <button 
                                    key={`classics-button--${classic.id}`} 
                                    className="classics-button" 
                                    id={`classics-button--${classic.id}`}
                                    onClick={(event) => {
                                            //update shared state object when a button is clicked
                                            setChosenClassicProp(classic)
                                        }}
                                    >{classic.name}</button>
                                </div>
                            } else {
                                return <div key={`button-row--${classic.id}`} className="button-row">
                                <IoStar className="no-star"/>
                                <button 
                                    key={`classics-button--${classic.id}`} 
                                    className="classics-button" 
                                    id={`classics-button--${classic.id}`}
                                    onClick={(event) => {
                                            //update shared state object when a button is clicked
                                            setChosenClassicProp(classic)
                                        }}
                                >{classic.name}</button>
                                </div>
                            }   
                        })
                    }
                </div>
            </div>
            <div className="classics-description-section">
                {/* render prompt or render entire description section */}
                {classicsDescriptionSectionContents}
            </div>
        </div>
    </>
}

