import { RootState } from "./../store"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import authService from "../../service/auth.service"
import { httpService } from "../../service/http.service"

interface UserDataType {
  email: string
  buy: OrdersBuyType[]
  avatarUrl: string
  fullName: string
  _id: string
  accessToken: string
  expiresIn: number
  refreshToken: string
  userId: string
}

interface UserState {
  data: UserDataType | null
  userProfile: null
  status: "loading" | "loaded" | "error"
  purchases: null
}

export interface OrdersBuyType {
  count: number
  imageUrl: string
  name: string
  price: number
  _id: string
}

type LoginMailType = {
  email: string
  password: string
}

export interface AboutUserType {
  email: string
  password: string
  fullName: string
  avatarUrl?: string
  returnSecureToken?: boolean
}

export const fetchAllOrders = createAsyncThunk<
  OrdersBuyType[],
  OrdersBuyType[],
  { rejectValue: string }
>(
  "orders/fetchAllOrders",

  async (params, { rejectWithValue }) => {
    const { data } = await httpService.post<OrdersBuyType[]>(`user/buy`, params)

    if (!data) {
      return rejectWithValue("Не удалось купить товар")
    }

    return data
  }
)

export const fetchUserData = createAsyncThunk<UserDataType, LoginMailType>(
  "user/fetchUserData",

  async (params) => {
    return await authService.logIn(params)
  }
)

export const fetchRegister = createAsyncThunk<UserDataType, AboutUserType>(
  "user/fetchRegister",
  async (params) => {
    return authService.register(params)
  }
)

export const fetchUserMe = createAsyncThunk<UserDataType>(
  "user/fetchUserMe",
  async () => {
    return authService.userMe()
  }
)

const initialState: UserState = {
  data: null,
  userProfile: null,
  status: "loading",
  purchases: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.data = null
    },
  },
  extraReducers: (builder) => {
    builder

      // fetchUserData
      .addCase(fetchUserData.pending, (state) => {
        state.data = null
        state.status = "loading"
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = "loaded"
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.data = null
        state.status = "error"
      })

      // Register
      .addCase(fetchRegister.pending, (state) => {
        state.data = null
        state.status = "loading"
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = "loaded"
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.data = null
        state.status = "error"
      })

      // Auth ME USER
      .addCase(fetchUserMe.pending, (state) => {
        state.data = null
        state.status = "loading"
      })
      .addCase(fetchUserMe.fulfilled, (state, action) => {
        state.data = action.payload
        state.status = "loaded"
      })
      .addCase(fetchUserMe.rejected, (state) => {
        state.data = null
        state.status = "error"
      })

    // [fetchUserData.pending]: (state) => {
    //   state.data = null
    //   state.status = "loading"
    // },
    // [fetchUserData.fulfilled]: (state, action) => {
    //   state.data = action.payload
    //   state.status = "loaded"
    // },
    // [fetchUserData.rejected]: (state) => {
    //   state.data = null
    //   state.status = "error"
    // },

    // Register
    // [fetchRegister.pending]: (state) => {
    //   state.data = null
    //   state.status = "loading"
    // },
    // [fetchRegister.fulfilled]: (state, action) => {
    //   state.data = action.payload
    //   state.status = "loaded"
    // },
    // [fetchRegister.rejected]: (state, action) => {
    //   state.data = null
    //   state.status = "error"
    // },

    // Auth ME USER
    // [fetchUserMe.pending]: (state) => {
    //   state.data = null
    //   state.status = "loading"
    // },
    // [fetchUserMe.fulfilled]: (state, action) => {
    //   state.data = action.payload
    //   state.status = "loaded"
    // },
    // [fetchUserMe.rejected]: (state, action) => {
    //   state.data = null
    //   state.status = "error"
    // },
    // //ORDER
    // [fetchAllOrders.pending]: (state) => {
    //   state.purchases = null
    //   state.status = "loading"
    // },
    // [fetchAllOrders.fulfilled]: (state, action) => {
    //   state.data.buy = action.payload
    //   state.status = "loaded"
    // },
    // [fetchAllOrders.rejected]: (state) => {
    //   state.purchases = null
    //   state.status = "error"
    // },
  },
})

//Selector
export const userAuthData = (state: RootState) => state.auth.data
export const selectIsAuth = (state: RootState) => Boolean(state.auth.data)

export const { logOut } = authSlice.actions
export const authReducer = authSlice.reducer
