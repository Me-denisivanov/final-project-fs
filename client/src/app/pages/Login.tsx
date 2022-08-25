import { useForm } from "react-hook-form"
import { Box, TextField, Button, CardActions, Typography } from "@mui/material"
import { fetchUserData, fetchUserMe, selectIsAuth } from "../redux/slices/auth"
import { useNavigate } from "react-router-dom"
import { ITokens, setTokens } from "../service/localStorage.service"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

interface IFormLogin {
  email: string
  password: string
}

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<IFormLogin>({
    mode: "onChange",
  })

  const formSubmit = async (infoData: IFormLogin) => {
    try {
      const data = await dispatch(fetchUserData(infoData))

      if (!data.payload) {
        return alert("Такого аккаунта у нас нет")
      }

      if (data.payload) {
        setTokens(data.payload as ITokens)
        dispatch(fetchUserMe())
      }
    } catch (e) {
      console.log(e)
    }
  }

  if (isAuth) {
    navigate("/")
  }

  return (
    <>
      <Typography variant="h6" sx={{ textAlign: "center", mt: "20px" }}>
        Вход в личный кабинет
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
            label="Почта"
            {...register("email", {
              required: "Укажите почту!",
            })}
            error={Boolean(errors?.email?.message)}
            helperText={errors?.email?.message}
            placeholder="Введите ваше почту"
          />
          <TextField
            label="Пароль"
            {...register("password", {
              required: "Укажите пароль!",
            })}
            error={Boolean(errors?.password?.message)}
            helperText={errors?.password?.message}
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

export default Login
