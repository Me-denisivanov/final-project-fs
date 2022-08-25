import React from "react"
import { TextField } from "@mui/material"
import { useAppDispatch } from "../../redux/hooks"
import { addSearchText } from "../../redux/slices/products"

const Search: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleChangeInput = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(addSearchText(target.value))
  }

  return (
    <TextField
      label="Поиск"
      type="search"
      fullWidth
      variant="standard"
      onChange={handleChangeInput}
      sx={{ mb: "20px" }}
    />
  )
}

export default Search
