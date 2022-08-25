import React from "react"
import { useSelector } from "react-redux"
import { selectIsAuth } from "../redux/slices/auth"
import { Navigate } from "react-router-dom"
import { getAccessToken } from "../service/localStorage.service"

interface IRequire {
  children: JSX.Element
}

const RequireAuth: React.FC<IRequire> = ({ children }): JSX.Element => {
  const isAuth = useSelector(selectIsAuth)

  if (!getAccessToken() && !isAuth) {
    return <Navigate to="/login" />
  }

  return children
}

export default RequireAuth
