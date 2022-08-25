import React, { useEffect } from "react"
import {
  Button,
  Avatar,
  Typography,
  Link,
  Card,
  CardContent,
  CardActions,
} from "@mui/material"
import {
  Link as RouterLink,
  useNavigate,
  useParams,
  useLocation,
} from "react-router-dom"
import { userAuthData } from "../redux/slices/auth"
import {
  fetchUserProfile,
  userAuthAbout,
  userNewAvatar,
} from "../redux/slices/edit"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

const UserProfile: React.FC = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const authData = useAppSelector(userAuthData)
  const userItem = useAppSelector(userAuthAbout)
  const userNewImg = useAppSelector(userNewAvatar)

  useEffect(() => {
    if (id) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, id])

  const onNavigate = () => {
    navigate(pathname + "/edit", { replace: true })
  }

  return (
    <>
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: "20px",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          sx={{ width: 60, height: 60 }}
          src={
            !userNewImg
              ? userItem.avatarUrl
              : `http://localhost:6050${userNewImg}`
          }
        />

        <CardContent>
          <Typography variant="h6">
            Ваше Имя: {authData && authData.fullName}
          </Typography>
          <Typography variant="body1">
            Ваша почта: {authData && authData.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained">
            <Link
              sx={{ textDecoration: "none", textAlign: "center" }}
              component={RouterLink}
              to="edit"
              onClick={onNavigate}
              color="inherit"
            >
              Изменить
            </Link>
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default UserProfile
