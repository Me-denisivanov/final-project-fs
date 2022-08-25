import React from "react"
import { Typography, Button } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { addCaregoryValue, clearAllFilter } from "../../redux/slices/products"

interface ICategory {
  name: string
  categoryValue: string
}

const Category: React.FC = () => {
  const dispatch = useAppDispatch()
  const searchSort = useAppSelector((state) => state.products.searchText)
  const categorySort = useAppSelector((state) => state.products.caregoryValue)

  const categoryArray: ICategory[] = [
    { name: "Холодильники", categoryValue: "fridge" },
    { name: "Телефоны", categoryValue: "phones" },
    { name: "Для дома", categoryValue: "house" },
  ]

  const setSorted = (sortItem: string): void => {
    dispatch(addCaregoryValue(sortItem))
  }

  const clearFilters = (): void => {
    dispatch(clearAllFilter())
  }

  return (
    <>
      {categoryArray.map((itemCategory, idx) => (
        <div key={idx}>
          <Button
            onClick={() => setSorted(itemCategory.categoryValue)}
            variant="outlined"
            sx={{ m: "5px", p: "10px", width: "100%" }}
          >
            <Typography>{itemCategory.name}</Typography>
          </Button>
        </div>
      ))}
      {searchSort || categorySort ? (
        <Button
          onClick={() => clearFilters()}
          color="error"
          variant="contained"
          sx={{ m: "5px", p: "10px", width: "100%" }}
        >
          <Typography>Очистить</Typography>
        </Button>
      ) : null}
    </>
  )
}

export default Category
