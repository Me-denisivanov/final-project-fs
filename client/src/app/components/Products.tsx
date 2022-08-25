import React from "react"
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Link,
  Badge,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { addItem } from "../redux/slices/basket"
import { userAuthData } from "../redux/slices/auth"
import { fetchRemoveProduct } from "../redux/slices/products"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

interface ProductsType {
  _id: string
  user: string
  rate: number
  name: string
  imageUrl: string
  price: number
  count: number
}

interface BasketAddType {
  name: string
  imageUrl: string
  price: number
  _id: string
  count: number
}

const Products: React.FC<ProductsType> = ({
  _id,
  user,
  rate,
  name,
  imageUrl,
  price,
  count,
}) => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(userAuthData)

  const cardItemCount = useAppSelector((state) =>
    state.basket.basketItems.find((obj) => obj._id === _id)
  )

  const addBasketItem = () => {
    const basketItems: BasketAddType | string = {
      name,
      imageUrl,
      price,
      _id,
      count,
    }
    dispatch(addItem(basketItems))
  }

  const removeProductItem = (productId: string) => {
    dispatch(fetchRemoveProduct(productId))
  }

  return (
    <>
      <Card>
        <Link
          sx={{ textDecoration: "none" }}
          component={RouterLink}
          to={`products/${_id}`}
          color="inherit"
        >
          <CardMedia
            image={imageUrl}
            component="img"
            alt="Product"
            title={name}
            sx={{ height: "100%" }}
          />
          <CardContent
            sx={{
              textAlign: "center",
            }}
          >
            <Typography variant="h6" component="h3">
              {name}
            </Typography>
            <Typography>Цена: {price} грн</Typography>
            <Typography>Рейтинг: {rate}</Typography>
          </CardContent>
        </Link>

        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Badge
            color="warning"
            badgeContent={cardItemCount ? cardItemCount.count : null}
          >
            <Button variant="contained" onClick={addBasketItem} sx={{ mr: 1 }}>
              Купить
            </Button>
            {userData && userData._id === user ? (
              <Button
                variant="contained"
                color="error"
                onClick={() => removeProductItem(_id)}
              >
                Удалить
              </Button>
            ) : null}
          </Badge>
        </CardActions>
      </Card>
    </>
  )
}

export default Products
