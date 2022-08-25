import { useForm } from "react-hook-form"
import { Box, TextField, Button, CardActions, Typography } from "@mui/material"
import {
  AboutUserType,
  fetchRegister,
  fetchUserMe,
  selectIsAuth,
} from "../redux/slices/auth"
import { ITokens, setTokens } from "../service/localStorage.service"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

const Register: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useAppSelector(selectIsAuth)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<AboutUserType>({
    mode: "all",
  })

  const formSubmit = async (infoData: AboutUserType) => {
    console.log(infoData)

    const data = await dispatch(fetchRegister(infoData))

    if (!data.payload) {
      return alert("Такая почта уже используется")
    }

    if (data.payload) {
      setTokens(data.payload as ITokens)
      dispatch(fetchUserMe())
    }
  }

  if (isAuth) {
    navigate("/")
  }

  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center", mt: "20px" }}>
        Регестрация
      </Typography>
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
          <TextField
            label="Имя"
            {...register("fullName", {
              required: "Укажите ваше имя!",
            })}
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            placeholder="Введите ваше имя!"
          />
          <TextField
            label="Почта"
            {...register("email", {
              required: "Укажите почту!",
            })}
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            placeholder="Введите ваше почту"
          />
          <TextField
            label="Пароль"
            {...register("password", {
              required: "Укажите пароль!",
              minLength: {
                value: 5,
                message: "Не меньше 5 символов",
              },
            })}
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            placeholder="Введите ваш пароль"
          />
          <CardActions>
            <Button disabled={!isValid} type="submit" variant="contained">
              Войти
            </Button>
          </CardActions>
        </Box>
      </form>
    </>
  )
}

export default Register
