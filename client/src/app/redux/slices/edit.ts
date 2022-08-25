import { RootState } from "./../store"
import { FetchUploadImageArgs } from "./products"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import httpService from "../../service/http.service"
import { OrdersBuyType } from "./auth"

export type AllInfoUser = {
  avatarUrl: string
  buy: OrdersBuyType[]
  createdAt: string
  email: string
  fullName: string
  password: string
  updatedAt: string
  __v: number
  _id: string
}

interface IEditProfile {
  fullName: string
  avatarUrl: string
}

interface EditState {
  editProfileAll: IEditProfile
  newAvatarUrl: string
  createImageUrl: string
  status: "loading" | "loaded" | "error"
}

export const fetchUserProfile = createAsyncThunk<AllInfoUser>(
  "edit/fetchUserProfile",

  async () => {
    const { data } = await httpService.get<AllInfoUser>(`user`)
    return data
  }
)

export const fetchUploadFile = createAsyncThunk<string, object>(
  "edit/fetchUploadFile",

  async (params) => {
    console.log(params)

    const { data } = await httpService.post<FetchUploadImageArgs>(
      "user/upload",
      params
    )
    return data.url
  }
)

const initialState: EditState = {
  editProfileAll: {
    fullName: "",
    avatarUrl: "",
  },
  newAvatarUrl: "",
  createImageUrl: "",
  status: "loading",
}

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    removeImage: (state) => {
      state.newAvatarUrl = ""
    },
  },
  extraReducers: (builder) => {
    builder

      // FetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.editProfileAll.fullName = action.payload.fullName
        state.editProfileAll.avatarUrl = action.payload.avatarUrl
        state.status = "loaded"
      })
      .addCase(fetchUserProfile.rejected, (state) => {
        state.status = "error"
      })

      // UPLOAD IMAGE
      .addCase(fetchUploadFile.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUploadFile.fulfilled, (state, action) => {
        state.newAvatarUrl = action.payload
        state.status = "loaded"
      })
      .addCase(fetchUploadFile.rejected, (state) => {
        state.status = "error"
      })

    // [fetchUserProfile.pending]: (state) => {
    //   state.data = null
    //   state.status = "loading"
    // },
    // [fetchUserProfile.fulfilled]: (state, action) => {
    //   state.editProfileAll.fullName = action.payload.fullName
    //   state.editProfileAll.avatarUrl = action.payload.avatarUrl
    //   state.status = "loaded"
    // },
    // [fetchUserProfile.rejected]: (state) => {
    //   state.data = null
    //   state.status = "error"
    // },

    // UPLOAD IMAGE
    // [fetchUploadFile.pending]: (state) => {
    //   state.data = null
    //   state.status = "loading"
    // },
    // [fetchUploadFile.fulfilled]: (state, action) => {
    //   state.newAvatarUrl = action.payload
    //   state.status = "loaded"
    // },
    // [fetchUploadFile.rejected]: (state) => {
    //   state.data = null
    //   state.status = "error"
    // },
  },
})

export const userAuthAbout = (state: RootState) => state.edit.editProfileAll
export const userNewAvatar = (state: RootState) => state.edit.newAvatarUrl

export const { removeImage } = editSlice.actions
export const editReducer = editSlice.reducer
