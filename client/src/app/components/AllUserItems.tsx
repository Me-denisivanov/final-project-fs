import React from "react"
import { Link } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

interface IAllUser {
  name: string
  _id: string
}

const AllUserItems: React.FC<IAllUser> = ({ name, _id }) => {
  return (
    <>
      <Link
        sx={{ textDecoration: "none" }}
        component={RouterLink}
        to={`/products/${_id}`}
      >
        <h2>{name}</h2>
      </Link>
    </>
  )
}
export default AllUserItems
