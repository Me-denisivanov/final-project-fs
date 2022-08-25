import React, { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Header from "./app/components/Header"
import RequireAuth from "./app/hoc/RequireAuth"
import Basket from "./app/pages/Basket"
import FullProducts from "./app/pages/FullProducts"
import Home from "./app/pages/Home"
import Login from "./app/pages/Login"
import Register from "./app/pages/Register"
import UserProfile from "./app/pages/UserProfile"
import EditUserPage from "./app/pages/EditUserPage"
import { fetchUserMe } from "./app/redux/slices/auth"
import CreateItem from "./app/pages/CreateItem"
import { useAppDispatch } from "./app/redux/hooks"
import Purchases from "./app/pages/Purchases"

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserMe())
  }, [dispatch])

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/products/:id"
          element={
            <RequireAuth>
              <FullProducts />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <RequireAuth>
              <UserProfile />
            </RequireAuth>
          }
        />
        <Route path="/profile/:id/edit" element={<EditUserPage />} />
        <Route
          path="/create"
          element={
            <RequireAuth>
              <CreateItem />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
