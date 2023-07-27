import { useNavigate } from "react-router-dom"
import "./ClassicCocktails.css"
import { useEffect, useState } from "react"

export const ClassicCocktails = () => {
    const [classicCocktails, setClassicCocktails] = useState([])
    const navigate = useNavigate()

    //State update on initial render
    useEffect(() => {
        fetch('http://localhost:8088/classicCocktails')
            .then(response => response.json())
            .then((classics) => {
                setClassicCocktails(classics)
            })

        },[]
    )
//map over classicCocktails and put each as a button
    return <>
    <h2 className="classics-header">Classic Cocktails</h2>
    <div className="classics-container">
        <div className="classics-buttons-section">
            {
                classicCocktails.map((classic) => {
                    return <button 
                        key={`classics-button--${classic.id}`} 
                        className="classics-button" 
                        id={`classics-button--${classic.id}`}
                        onClick={() => {}}
                    >{classic.name}</button>
                })
            }
        </div>
        <div className="classics-description-section">
            <div>
                *image here*
            </div>
            <p className="classics-description">
                *Description Here*
            </p>
            <button className="use-classic-button"
                onClick={() => {}}
            >Create a Cocktail</button>
        </div>
    </div>
    </>
}