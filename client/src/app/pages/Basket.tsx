import React from "react"
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  ListItem,
  Typography,
  Button,
} from "@mui/material"
import { Close, Add, Remove } from "@mui/icons-material"

import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  plusItem,
  minusItem,
  removeItem,
  clearItem,
} from "../redux/slices/basket"
import { fetchAllOrders, selectIsAuth } from "../redux/slices/auth"
import SnackBarMU from "../components/ui/SnackBar"

const Basket: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false)

  const dispatch = useAppDispatch()

  const isAuth = useAppSelector(selectIsAuth)
  const basketItemsSelect = useAppSelector((state) => state.basket.basketItems)
  const { totalPrice } = useAppSelector((state) => state.basket)

  const handlePlus: (id: string) => void = (id) => {
    dispatch(plusItem(id))
  }
  const handleMinus: (id: string) => void = (id) => {
    dispatch(minusItem(id))
  }
  const handleRemoveItem: (id: string) => void = (id) => {
    dispatch(removeItem(id))
  }

  const handleBuy = async () => {
    await dispatch(fetchAllOrders(basketItemsSelect))
    await dispatch(clearItem())
    setOpen(true)
  }

  return (
    <>
      {basketItemsSelect.length ? (
        <Grid
          container
          sx={{ mt: "20px", display: "flex", justifyContent: "space-around" }}
          spacing={2}
        >
          <Grid>
            {basketItemsSelect.map((item) => (
              <Grid key={item._id} item xs={12} md={12}>
                <Card
                  sx={{
                    p: "20px",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <CardMedia
                    image={item.imageUrl}
                    component="img"
                    alt="Product"
                    title={item.name}
                    sx={{ height: "100%", maxWidth: "200px" }}
                  />
                  <CardContent
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h6" component="h3">
                      {item.name}
                    </Typography>
                    <Typography>Цена: {item.price}</Typography>
                  </CardContent>

                  <CardContent sx={{ margin: "0 auto" }}>
                    <ListItem>
                      <IconButton onClick={() => handlePlus(item._id)}>
                        <Add />
                      </IconButton>
                      <Typography>Кол-во: {item.count}</Typography>
                      <IconButton onClick={() => handleMinus(item._id)}>
                        <Remove />
                      </IconButton>
                    </ListItem>
                  </CardContent>

                  <CardContent sx={{ margin: "0 auto" }}>
                    <Typography>
                      Стоимость: {item.price * item.count}
                    </Typography>
                  </CardContent>
                  <CardContent sx={{ margin: "0 auto" }}>
                    <ListItem>
                      <IconButton onClick={() => handleRemoveItem(item._id)}>
                        <Close />
                      </IconButton>
                    </ListItem>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12} md={3}>
            <Card
              sx={{
                padding: "20px",
                margin: "0 auto",
              }}
            >
              <CardContent sx={{ display: "flex", justifyContent: "center" }}>
                <Typography>К оплате: {totalPrice}</Typography>
              </CardContent>
              <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleBuy}
                  disabled={!isAuth}
                >
                  Оформить заказ
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h4" sx={{ mt: "20px", textAlign: "center" }}>
          Ваша коризна пустая
        </Typography>
      )}
      <SnackBarMU isOpen={open} handleClose={() => setOpen(false)} />
    </>
  )
}

export default Basket
