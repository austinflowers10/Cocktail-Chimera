import { Link, useNavigate, useLocation } from "react-router-dom"
import "./NavBar.css"
import { BsPersonCircle } from "react-icons/bs";
import { BiLogOut, BiSolidUserCircle } from "react-icons/bi";
import { LiaCocktailSolid } from "react-icons/lia";


export const NavBar = () => {
    const navigate = useNavigate()
    const chimeraUserObj = JSON.parse(localStorage.getItem("chimera_user"))
    const location = useLocation()

    return <div className="navbar-container">
        <Link className="app-header" to="/">Cocktail Chimera <LiaCocktailSolid className="cocktail-icon"/></Link>

        <ul className="navbar-list">
            {/* Show Home Link if not on home page */}
            {/*  */}
            {
                location.pathname === "/create-cocktail" || location.pathname === "/my-craft-cocktails" || location.pathname === "/my-ingredients"

                ? <li className="navbar__item active">
                    <Link className="navbar__link" to="/classic-cocktails">Classic Cocktails</Link>
                </li>

                : null
            }
            {/* Show My Craft Cocktails link on the Classic Cocktail page, Create a Cocktail page, and My Ingredients page */}
            {
                location.pathname === "/classic-cocktails" || location.pathname === "/create-cocktail" || location.pathname === "/my-ingredients"

                ? <li className="navbar__item active">
                    <Link className="navbar__link" to="/my-craft-cocktails">My Craft Cocktails</Link>
                </li>

                : null
            }
            {/* Show the Create a Cocktail link on the My Craft Cocktails page and the My Ingredients page */}
            {
                location.pathname === "/my-craft-cocktails" || location.pathname === "/my-ingredients" || location.pathname === "/classic-cocktails"

                ? <li className="navbar__item active">
                    <Link className="navbar__link" to="/create-cocktail">Create a Cocktail</Link>
                </li>

                : null
            }
            {/* Show the My Ingredients link on the Classic Cocktails page, Create a Cocktail page, and My Craft Cocktails page */}
            {
                location.pathname === "/classic-cocktails" || location.pathname === "/create-cocktail" || location.pathname === "/my-craft-cocktails"

                ? <li className="navbar__item active">
                    <Link className="navbar__link" to="/my-ingredients">My Ingredients</Link>
                </li>

                : null
            }
        </ul>
        <div className="user-icons-container">
            <BiSolidUserCircle className="user-icon profile"/>
            <BiLogOut className="user-icon log-out" onClick={() => {
                    localStorage.removeItem("chimera_user")
                    navigate("/", {replace: true})
                }}/>
        </div>
        
    </div>
}

