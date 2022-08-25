import {
  Box,
  Button,
  CardActions,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import {
  clearProfile,
  fetchCreateProducts,
  FetchCreateProductsArgs,
  fetchUploadImageCreate,
  removeImageCreate,
  selectImageCreate,
} from "../redux/slices/products"
import { helperUpload } from "../utils/handleUploadFile"

const CreateItem: React.FC = () => {
  const dispatch = useAppDispatch()
  const inputFileRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<FetchCreateProductsArgs>({
    mode: "onChange",
  })
  const createImage = useAppSelector(selectImageCreate)

  const formSubmit = async (infoData: FetchCreateProductsArgs) => {
    const data = await dispatch(
      fetchCreateProducts({
        imageUrl: `http://localhost:6050${createImage}`,
        ...infoData,
      })
    )
    dispatch(clearProfile())
    navigate("/")

    return data
  }
  const handleUploadFile = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await helperUpload(target, dispatch, fetchUploadImageCreate)
    } catch (e) {
      console.warn(e)
      alert("Ошибка с загрузкой каринки")
    }
  }

  const handleDeleteFile = () => {
    dispatch(removeImageCreate())
  }

  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center", mt: "20px" }}>
        Добавить новый товар
      </Typography>
      <Paper sx={{ mt: 1 }}>
        <form action="#" onSubmit={handleSubmit(formSubmit)}>
          <Box
            sx={{
              py: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <img
              className="img__create"
              src={
                !createImage
                  ? "https://cdn-icons-png.flaticon.com/512/25/25333.png"
                  : `http://localhost:6050${createImage}`
              }
              alt="Товар"
            />
            <div>
              <Button
                variant="contained"
                sx={{ m: "10px 10px" }}
                onClick={() => inputFileRef?.current?.click()}
              >
                Загрузить аватарку
              </Button>
              {createImage && (
                <Button
                  variant="contained"
                  sx={{ m: "10px 0" }}
                  color="error"
                  onClick={handleDeleteFile}
                >
                  Удалить
                </Button>
              )}
            </div>

            <input
              ref={inputFileRef}
              type="file"
              onChange={handleUploadFile}
              hidden
            />
            <TextField
              label="Название"
              {...register("name", {
                required: "Укажите название!",
              })}
              error={Boolean(errors?.name?.message)}
              helperText={errors?.name?.message}
              placeholder="Название"
            />

            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                <Typography sx={{ textAlign: "center" }}>
                  Выберите тип товара:
                </Typography>
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <div>
                  <FormControlLabel
                    value="house"
                    {...register("type")}
                    control={<Radio />}
                    label="Для дома"
                  />
                  <FormControlLabel
                    value="phones"
                    {...register("type")}
                    control={<Radio />}
                    label="Телефоны"
                  />
                  <FormControlLabel
                    value="fridge"
                    {...register("type")}
                    control={<Radio />}
                    label="Холодильники"
                  />
                </div>
              </RadioGroup>
            </FormControl>

            <TextField
              label="Цена"
              {...register("price", {
                required: "Укажите цену!",
              })}
              error={Boolean(errors?.price?.message)}
              helperText={errors?.price?.message}
              placeholder="Цена"
            />

            <CardActions>
              <Button disabled={!isValid} type="submit" variant="contained">
                Создать
              </Button>
            </CardActions>
          </Box>
        </form>
      </Paper>
    </>
  )
}

export default CreateItem
