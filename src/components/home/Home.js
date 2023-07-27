import { useNavigate } from "react-router-dom"
import "./Home.css"


export const Home = () => {

    const navigate = useNavigate()

    return <div className="home-container">
        <div className="home-description-section">
            <p className="home-description">
            Manage your home bar inventory and make new cocktails inspired by classic cocktails that have stood the test of time.
            </p>
        </div>
        <div className="home-buttons-section">
            <button className="home-buttons" id="home-button--1" 
            onClick={() => {navigate("/classic-cocktails")}}
            >Classic Cocktails</button>

            <button className="home-buttons" id="home-button--2"
                onClick={() => {navigate("/create-cocktail")}}
            >Create a Cocktail</button>

            <button className="home-buttons" id="home-button--3"
                onClick={() => {navigate("/my-craft-cocktails")}}
            >My Craft Cocktails</button>
            
            <button className="home-buttons" id="home-button--4" 
                onClick={() => { navigate("/my-ingredients")}}
            >My Ingredients</button>
        </div>
    </div>
}