import { NavBar } from "../nav/NavBar"
import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../home/Home"
import { ClassicCocktails } from "../classics/ClassicCocktails"


export const ApplicationViews = () => {
    // const chimeraUserObj = JSON.parse(localStorage.getItem("chimera_user"))

	return (
        <Routes>
            <Route path="/" element={
                <>
                    <NavBar />
                    <Outlet />
                </>
            }>
                <Route index element={<Home/>}/>
                <Route path="/classic-cocktails" element={<ClassicCocktails/>}/>
                <Route path="/create-cocktail" element={<></>}/> 
                <Route path="/my-craft-cocktails" element={<></>}/>
                <Route path="/my-ingredients" element={<></>}/>
            </Route>
        </Routes>
    )
}