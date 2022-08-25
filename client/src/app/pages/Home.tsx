import React, { useEffect } from "react"
import { Grid, Typography } from "@mui/material"
import { Container } from "@mui/system"
import Products from "../components/Products"
import Category from "../components/ui/Category"
import Search from "../components/ui/Search"
import Sorted from "../components/ui/Sorted"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  fetchProducts,
  isStatus,
  selectProducts,
} from "../redux/slices/products"

const Home: React.FC = () => {
  const dispatch = useAppDispatch()
  const isStatusLoading = useAppSelector(isStatus)
  const selectProductItems = useAppSelector(selectProducts)

  const searchSort = useAppSelector((state) => state.products.searchText)
  const categorySort = useAppSelector((state) => state.products.caregoryValue)
  const sortValue = useAppSelector((state) => state.products.sortedValue)

  useEffect(() => {
    dispatch(fetchProducts({ searchSort, categorySort, sortValue }))
  }, [dispatch, searchSort, categorySort, sortValue])

  return (
    <Container sx={{ mt: "20px", pb: 5 }}>
      <Search />
      <Sorted />

      <Grid sx={{ mt: "10px" }}>
        <Grid container item spacing={2}>
          <Grid item xs={12} md={2}>
            <Typography sx={{ textAlign: "center" }} variant="h6">
              Сортировать по:
            </Typography>

            <Category />
          </Grid>

          {isStatusLoading === "loading" ? (
            <Typography
              variant="h3"
              component="h3"
              sx={{ textAlign: "center", m: "50px auto" }}
            >
              Loading...
            </Typography>
          ) : (
            selectProductItems &&
            selectProductItems.map((item) => (
              <Grid key={item._id} item xs={12} md={4}>
                <Products {...item} />
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
