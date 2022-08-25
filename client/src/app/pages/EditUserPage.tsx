import React, { useRef, useEffect, useState } from "react"
import {
  Button,
  Avatar,
  Typography,
  Card,
  CardContent,
  CardActions,
  TextField,
} from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { fetchUserMe } from "../redux/slices/auth"
import {
  fetchUploadFile,
  fetchUserProfile,
  removeImage,
  userAuthAbout,
  userNewAvatar,
} from "../redux/slices/edit"
import { httpService } from "../service/http.service"
import { helperUpload } from "../utils/handleUploadFile"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

const EditUserPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const inputFileRef = useRef<HTMLInputElement>(null)

  const userItem = useAppSelector(userAuthAbout)
  const userNewImg = useAppSelector(userNewAvatar)

  const [inputTextValue, setInputTextValue] = useState<string>(
    userItem.fullName
  )

  const removeNewImage = () => {
    dispatch(removeImage())
  }

  useEffect(() => {
    if (id) {
      dispatch(fetchUserProfile())
    }
  }, [dispatch, id])

  const handleUploadFile = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    try {
      await helperUpload(target, dispatch, fetchUploadFile)
    } catch (e) {
      console.warn(e)
      alert("Ошибка с загрузкой каринки")
    }
  }

  const onFileSubmit = async () => {
    try {
      await httpService.patch(`user/${id}`, {
        fullName: inputTextValue,
        avatarUrl: !userNewImg
          ? userItem.avatarUrl
          : `http://localhost:6050${userNewImg}`,
      })

      await dispatch(fetchUserMe())

      navigate(`/profile/${id}`)
    } catch (error) {
      console.log(error)
    }
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
          sx={{ width: 75, height: 75, m: "17px 0" }}
          src={
            !userNewImg
              ? userItem.avatarUrl
              : `http://localhost:6050${userNewImg}`
          }
        />
        <div className="button_remove">
          <Button
            variant="contained"
            sx={{ m: "10px 10px" }}
            onClick={() => inputFileRef?.current?.click()}
          >
            Загрузить аватарку
          </Button>
          {userNewImg ? (
            <Button variant="contained" color="error" onClick={removeNewImage}>
              Удалить
            </Button>
          ) : null}
        </div>
        <input
          ref={inputFileRef}
          type="file"
          onChange={handleUploadFile}
          hidden
        />
        <CardContent>
          <Typography variant="h6">
            <TextField
              id="outlined-basic"
              onChange={({ target }) => setInputTextValue(target.value)}
              variant="outlined"
              value={inputTextValue}
            />
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={onFileSubmit}
            sx={{ mb: "20px" }}
          >
            Сохранить
          </Button>
        </CardActions>
      </Card>
    </>
  )
}

export default EditUserPage
