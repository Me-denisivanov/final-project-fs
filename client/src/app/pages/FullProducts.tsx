import { Paper, Typography, Button } from "@mui/material"
import React, { useState, useEffect } from "react"

import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch } from "../redux/hooks"
import { addItem, BasketType } from "../redux/slices/basket"
import { httpService } from "../service/http.service"

interface IDataItem {
  count: number
  createdAt: string
  imageUrl: string
  name: string
  price: number
  rate: number
  type: string
  updatedAt: string
  __v: number
  _id: string
}

const FullProducts: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [data, setData] = useState<IDataItem>()

  useEffect(() => {
    httpService
      .get(`product/${id}`)
      .then((res) => {
        console.log(res.data)

        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  const handleAllItems = () => {
    navigate("/product")
  }

  const addBasket = () => {
    const basketItems: BasketType = {
      name: String(data?.name),
      imageUrl: String(data?.imageUrl),
      price: Number(data?.price),
      _id: String(data?._id),
      count: Number(data?.count),
    }
    dispatch(addItem(basketItems))
  }

  return (
    <>
      {data && (
        <Paper elevation={2} sx={{ pt: "40px" }}>
          <div className="full_flex">
            <img src={data.imageUrl} alt={data.name} className="image__full" />
            <Typography component={"span"} variant={"h6"}>
              {data.name}
            </Typography>
            <Typography component={"span"} variant={"body2"}>
              Цена: {data.price}
            </Typography>
            <Typography component={"span"} variant={"body2"}>
              Рейтинг: {data.rate}
            </Typography>
            <Typography>
              <Typography component={"span"} variant={"body2"}>
                Описание:
              </Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
              labore earum quaerat voluptas odio vitae rem vero numquam
              excepturi eius doloribus repudiandae cumque, necessitatibus ex vel
              non voluptatum. Tempore, quia. Ducimus repudiandae, vero quibusdam
              voluptates hic eligendi inventore fuga obcaecati voluptatibus
              ipsam. Expedita similique fuga veniam? Odit, nesciunt saepe illo
              consectetur, adipisci expedita corrupti in velit, at ipsum
            </Typography>
            <div>
              <Button
                variant="contained"
                color="error"
                sx={{ m: "10px 6px" }}
                onClick={handleAllItems}
              >
                Ко всем товарам
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ m: "10px 6px" }}
                onClick={addBasket}
              >
                Купить
              </Button>
            </div>
          </div>
        </Paper>
      )}
    </>
  )
}

export default FullProducts
