import React, { useState } from "react"
import { Link as RouterLink } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  Badge,
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Button,
} from "@mui/material"
import { logOut, selectIsAuth, userAuthData } from "../redux/slices/auth"
import localStorageService, {
  removeAuthData,
} from "../service/localStorage.service"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

const Header: React.FC = () => {
  const dispatch = useAppDispatch()
  const id = localStorageService.getUserId()

  const isAuth = useAppSelector(selectIsAuth)
  const isAuthData = useAppSelector(userAuthData)
  const basketCount = useAppSelector((state) => state.basket.basketItems)

  // +Material UI
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (): void => {
    setAnchorElUser(null)
  }

  const handleExit = (): void => {
    dispatch(logOut())
    removeAuthData()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography sx={{ flexGrow: 1 }}>
          <Link
            sx={{ textDecoration: "none" }}
            component={RouterLink}
            to="/"
            color="inherit"
          >
            <Button variant="contained" color="info">
              Магазин
            </Button>
          </Link>
        </Typography>
        <Typography sx={{ flexGrow: 0.85 }}>
          <Link
            sx={{ textDecoration: "none", textAlign: "center" }}
            component={RouterLink}
            to="/basket"
            color="inherit"
          >
            <Badge color="warning" badgeContent={basketCount.length}>
              Корзина
            </Badge>
          </Link>
        </Typography>

        {!isAuth ? (
          <>
            <Link
              sx={{ textDecoration: "none" }}
              component={RouterLink}
              to="/login"
              color="inherit"
            >
              <Button variant="outlined" color="inherit">
                Войти
              </Button>
            </Link>

            <Link
              sx={{ textDecoration: "none", pl: "12px" }}
              component={RouterLink}
              to="/register"
              color="inherit"
            >
              <Button variant="contained" color="error">
                Регестрация
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Box sx={{ flexGrow: 0 }}>
              <div className="profile__header">
                <Tooltip title="Подробнее">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, mr: "20px" }}
                  >
                    <Avatar alt="Remy Sharp" src={isAuthData?.avatarUrl} />
                  </IconButton>
                </Tooltip>
                <div>
                  <Typography>Добро пожаловать:</Typography>
                  <Typography sx={{ textAlign: "center" }}>
                    {isAuthData && isAuthData.fullName}
                  </Typography>
                </div>
              </div>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button>
                    <Link
                      sx={{ textDecoration: "none" }}
                      component={RouterLink}
                      to={`/profile/${id}`}
                    >
                      Профиль
                    </Link>
                  </Button>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Button>
                    <Link
                      sx={{ textDecoration: "none" }}
                      component={RouterLink}
                      to="/purchases"
                    >
                      Мои покупки
                    </Link>
                  </Button>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Button>
                    <Link
                      sx={{ textDecoration: "none" }}
                      component={RouterLink}
                      to="/create"
                    >
                      Добавить товар
                    </Link>
                  </Button>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Button onClick={handleExit}>Выход</Button>
                </MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
