import { Link, useNavigate, useLocation } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()
    const chimeraUserObj = JSON.parse(localStorage.getItem("chimera_user"))
    const location = useLocation()

    return <div className="navbar-container">
        <h1>Cocktail Chimera</h1>

        <ul className="navbar-list">
            {/* Show Home Link if not on home page */}
            {
                location.pathname === "/"

                ? null

                : <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Home</Link>
                </li>
            }
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
                location.pathname === "/my-craft-cocktails" || location.pathname === "/my-ingredients"

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

            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("chimera_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
        <button className="user-icon">{chimeraUserObj.name.slice(0,1)}</button>
        {/* Add an onClick to toggle user info box visible or invisible and put the user email and logout button in there.  */}
        
    </div>
}

