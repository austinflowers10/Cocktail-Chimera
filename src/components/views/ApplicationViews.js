import { NavBar } from "../nav/NavBar"
import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../home/Home"
import { ClassicCocktails } from "../classics/ClassicCocktails"
import { CreateCocktail } from "../create/CreateCocktail"
import { useEffect, useState } from "react"
import { MyIngredients } from "../ingredients/MyIngredients"


export const ApplicationViews = () => {
    const chimeraUserObj = JSON.parse(localStorage.getItem("chimera_user"))
    const [classicCocktails, setClassicCocktails] = useState([])
    const [chosenClassic, setChosenClassic] = useState(null)
    const [favorites, setFavorites] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [userIngredients, setUserIngredients] = useState([])
    const [keywords, setKeywords] = useState([])

    //function to fetch ingredients with ingredientKeywords expanded
    const fetchIngredients = () => {
        fetch('http://localhost:8088/ingredients?_embed=ingredientKeywords')
            .then(response => response.json())
            .then((ingredientsData) => {
                setIngredients(ingredientsData)
            })
    }

    //function to fetch userFavorites
    const fetchFavorites = () => {
        fetch('http://localhost:8088/userFavorites')
            .then(response => response.json())
            .then((allFavorites) => {
                //filter and set favorites state to only the chimera_user favorites
                const chimeraUserFavorites = allFavorites.filter(favorite => favorite.userId === chimeraUserObj.id)
                setFavorites(chimeraUserFavorites)
            })
    }

    //function to fetch userIngredients
    const fetchUserIngredients = () => {
        fetch('http://localhost:8088/userIngredients?_embed=userIngredientKeywords')
            .then(response => response.json())
            .then((allUserIngredients) => {
                // filter and set useringredients state to only the chimera_user ingredients
                const chimeraUserIngredients = allUserIngredients.filter(ingredient => ingredient.userId === chimeraUserObj.id)
                setUserIngredients(chimeraUserIngredients)
            }) 
    }

    //function to fetch all keywords
    const fetchKeywords = () => {
        fetch('http://localhost:8088/keywords')
            .then(response => response.json())
            .then((keywordsData) => {
                setKeywords(keywordsData)
            })
    }

     //Get all classics and fetch favorites on initial render
    useEffect(() => {
        fetch('http://localhost:8088/cocktails?_embed=classicsIngredients')
            .then(response => response.json())
            .then((classicsData) => {
                setClassicCocktails(classicsData)
            })

            fetchFavorites()
            fetchIngredients()
            fetchUserIngredients()
            fetchKeywords()

        },[]
    )

    if (!ingredients.length || !keywords.length) {
        return null
    }

	return (
        <Routes>
            <Route path="/" element={
                <>
                    <NavBar />
                    <Outlet />
                </>
            }>
                <Route index element={<Home/>}/>

                <Route path="/classic-cocktails" element={<ClassicCocktails 
                    classicCocktailsProp={classicCocktails}
                    chosenClassicProp={chosenClassic}
                    setChosenClassicProp={setChosenClassic}
                    favoritesProp={favorites}
                    fetchFavoritesProp={fetchFavorites}
                    chimeraUserObjProp={chimeraUserObj}
                    />}/>

                <Route path="/create-cocktail" element={<CreateCocktail 
                    classicCocktailsProp={classicCocktails}
                    chosenClassicProp={chosenClassic}
                    setChosenClassicProp={setChosenClassic}
                    favoritesProp={favorites}
                    chimeraUserObjProp={chimeraUserObj}
                    ingredientsProp={ingredients}
                    userIngredientsProp={userIngredients}
                    />}/> 

                

                <Route path="/my-ingredients" element={<MyIngredients
                    ingredientsProp={ingredients}
                    userIngredientsProp={userIngredients}
                    chimeraUserObjProp={chimeraUserObj}
                    keywordsProp={keywords}
                    fetchUserIngredientsProp={fetchUserIngredients}
                    />}/>

                <Route path="/my-craft-cocktails" element={<></>}/>
            </Route>
        </Routes>
    )
}