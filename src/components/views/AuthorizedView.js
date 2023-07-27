import { Navigate, useLocation } from "react-router-dom"

export const AuthorizedView = ({ children }) => {
    const location = useLocation()

    if (localStorage.getItem("chimera_user")) {
        return children
    }
    else {
        return <Navigate
            to={`/login/${location.search}`}
            replace
            state={{ location }} />
    }
}
