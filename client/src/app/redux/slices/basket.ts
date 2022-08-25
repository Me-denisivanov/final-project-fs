import { RootState } from "./../store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type BasketType = {
  name: string
  imageUrl: string
  price: number
  _id: string
  count: number
}

type BasketState = {
  basketItems: BasketType[]
  totalPrice: number
}

const initialState: BasketState = {
  basketItems: [],
  totalPrice: 0,
}

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<BasketType>) => {
      const findItem = state.basketItems.find(
        (obj) => obj._id === action.payload._id
      )

      if (findItem) {
        findItem.count++
      } else {
        state.basketItems.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = state.basketItems.reduce((acc, obj) => {
        return obj.price * obj.count + acc
      }, 0)
    },
    plusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.basketItems.find(
        (obj) => obj._id === action.payload
      )

      if (findItem) {
        findItem.count++
        state.totalPrice += findItem.price
      }
    },
    minusItem: (state, action: PayloadAction<string>) => {
      const findItem = state.basketItems.find(
        (obj) => obj._id === action.payload
      )

      if (findItem && findItem.count > 1) {
        findItem.count--
        state.totalPrice -= findItem.price
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const findItem = state.basketItems.find(
        (obj) => obj._id === action.payload
      )
      if (findItem) {
        state.totalPrice -= findItem.price * findItem.count
      }
      state.basketItems = state.basketItems.filter(
        (item) => item._id !== action.payload
      )
    },
    clearItem: (state) => {
      state.basketItems = []
      state.totalPrice = 0
    },
  },
})

export const { addItem, plusItem, minusItem, removeItem, clearItem } =
  basketSlice.actions

export const selectCart = (state: RootState) => state.basket

export const basketReducer = basketSlice.reducer
