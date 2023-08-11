import "./CreateCocktail.css"
import { IoStar } from "react-icons/io5";

export const ChangeTemplateMenu = (
    {favoritesProp, classicCocktailsProp, setChosenClassicProp, setMiddleSubtitleProp, middleSubtitleProp}) => {
    return <div className="change-template-menu">
            <h3 className="create-subtitles create-subtitle-flavors">{middleSubtitleProp}</h3>
            <div className="change-template-buttons-section">
            {
                classicCocktailsProp.map((classic) => {
                    //boolean to see if it is a favorite
                    const isFavorite = favoritesProp.find(favorite => classic.id === favorite.cocktailId)
                    //if it is a favorite, put a star in front of it  
                        return <div key={`button-row--${classic.id}`} className="button-row">
                        <IoStar className={isFavorite ? "little-star" : "no-star"}/>
                        <button 
                            key={`classics-button--${classic.id}`} 
                            className="classics-button" 
                            id={`classics-button--${classic.id}`}
                            onClick={(event) => {
                                    //update shared state object when a button is clicked
                                    setChosenClassicProp(classic)
                                    document.querySelector(".flavor-traits-container").style.visibility = "visible"
                                    document.querySelector(".change-template-menu").style.visibility = "hidden"
                                    setMiddleSubtitleProp('Ingredients and Flavor Traits')
                                }}
                            >{classic.name}</button>
                        </div>
                    
                })
            }
            </div>
        </div>
}
    
// <h3 className="change-template-subtitle">Choose a Template</h3>
