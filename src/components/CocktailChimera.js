import { Route, Routes } from "react-router-dom"
import { AuthorizedView } from "./views/AuthorizedView"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
// import { Register } from "./auth/Register"
import "./CocktailChimera.css"


export const CocktailChimera = () => {
	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<></>} />

		<Route path="*" element={
			<AuthorizedView>
				<>
					<ApplicationViews />
				</>
			</AuthorizedView>

		} />
	</Routes>
}
