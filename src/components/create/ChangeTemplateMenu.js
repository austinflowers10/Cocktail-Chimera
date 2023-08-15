import "./CreateCocktail.css"
import { IoStar } from "react-icons/io5";
import { MdClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";


export const ChangeTemplateMenu = (
    {favoritesProp, classicCocktailsProp, setChosenClassicProp, setMiddleSubtitleProp, middleSubtitleProp,       setIngredientClickedProp, chosenClassicProp, userIngredientsProp}) => {

    const navigate = useNavigate()

    return <div className="change-template-menu">
            <div className="change-template-header-row">
            <div className="change-template-spacer-left"/>
            <h3 className="create-subtitles change-template-header">
            {
                userIngredientsProp.length
                ? `${middleSubtitleProp}`
                : ""
            }
            </h3>
            <button className="change-template-x-button">
                {
                    chosenClassicProp
                    ? <MdClear className="change-template-x-icon"
                    onClick={(event) => {
                        setMiddleSubtitleProp('Ingredients and Flavor Traits')
                    }}
                    />
                    : <div className="change-template-spacer-right"/>
                }
                
            </button>
            </div>
            <div className="change-template-buttons-section">
            {
                userIngredientsProp.length
                ? <>
                    {
                    classicCocktailsProp.map((classic) => {
                        //boolean to see if it is a favorite
                        const isFavorite = favoritesProp.find(favorite => classic.id === favorite.cocktailId)
                        //if it is a favorite, put a star in front of it  
                            return <div key={`button-row--${classic.id}`} className="button-row">
                            <IoStar className={isFavorite ? "little-star" : "no-star"}/>
                            <button 
                                key={`classics-button--${classic.id}`} 
                                className="grey-button classics-button" 
                                id={`classics-button--${classic.id}`}
                                onClick={(event) => {
                                        //update shared state object when a button is clicked
                                        setChosenClassicProp(classic)
                                        document.querySelector(".flavor-traits-container").style.visibility = "visible"
                                        document.querySelector(".change-template-menu").style.visibility = "hidden"
                                        setMiddleSubtitleProp('Ingredients and Flavor Traits')
                                        setIngredientClickedProp(false)
                                    }}
                                >{classic.name}</button>
                            </div>
                        
                    })
                    }
                </>
                : <>
                    <div className="classics-redirect-prompt-container">
                        <p>You have not added any Ingredients yet</p>
                        <div className="classics-redirect-button-row">
                            <button className="classics-redirect-button"
                                onClick={() => {navigate("/my-ingredients")}}
                            >Add Ingredients</button>
                        </div>
                    </div>
                </>
            }
            </div>
        </div>
}
    
// <h3 className="change-template-subtitle">Choose a Template</h3>
