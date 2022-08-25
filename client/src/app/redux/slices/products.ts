import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import httpService from "../../service/http.service"
import { RootState } from "../store"

type ProductsType = {
  user: string
  _id: string
  type: string
  name: string
  imageUrl: string
  price: number
  rate: number
  count: number
  createdAt: string
  updatedAt: string
  userId?: string
  __v: number
}

// Типы для initialState
type ProductsState = {
  items: ProductsType[]
  status: "loading" | "loaded"
  searchText: string
  caregoryValue: string
  sortedValue: string
  imageCreate: string
}

type FetchProductsArgs = Record<string, string>
export type FetchCreateProductsArgs = Record<string, string>
export type FetchUploadImageArgs = Record<string, string>

export const fetchProducts = createAsyncThunk<
  ProductsType[],
  FetchProductsArgs
>("products/fetchProducts", async ({ searchSort, categorySort, sortValue }) => {
  const { data } = await httpService.get<ProductsType[]>("product", {
    params: {
      searchValue: searchSort,
      caregoryValue: categorySort,
      sortedValue: sortValue,
    },
  })
  return data
})

export const fetchCreateProducts = createAsyncThunk<
  ProductsType,
  FetchCreateProductsArgs
>("products/fetchCreateProducts", async (items) => {
  const { data } = await httpService.post<ProductsType>("product/create", items)
  return data
})

export const fetchUploadImageCreate = createAsyncThunk<string, object>(
  "edit/fetchUploadImageCreate",

  async (params) => {
    const { data } = await httpService.post<FetchUploadImageArgs>(
      "product/upload",
      params
    )

    return data.url
  }
)

export const fetchRemoveProduct = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("products/fetchRemoveProduct", async (id, { rejectWithValue }) => {
  const { data } = await httpService.delete<string>(`product/${id}`)

  if (!data) {
    return rejectWithValue("Не получилось удалить. Ошибка сервера")
  }

  return id
})

const initialState: ProductsState = {
  items: [],
  status: "loading",
  searchText: "",
  caregoryValue: "",
  sortedValue: "",
  imageCreate: "",
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    },
    addCaregoryValue: (state, action: PayloadAction<string>) => {
      state.caregoryValue = action.payload
    },
    addSortedValue: (state, action: PayloadAction<string>) => {
      state.sortedValue = action.payload
    },
    removeImageCreate: (state) => {
      state.imageCreate = ""
    },
    clearProfile: (state) => {
      state.imageCreate = ""
      state.items = []
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload)
    },
    clearAllFilter: (state) => {
      state.searchText = ""
      state.caregoryValue = ""
      state.sortedValue = ""
    },
  },
  extraReducers: (builder) => {
    builder

      // GET Products
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
        state.items = []
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = "loaded"
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.items = []
        state.status = "loading"
      })

      // Create Item
      .addCase(fetchCreateProducts.pending, (state) => {
        state.items = []
        state.status = "loading"
      })
      .addCase(fetchCreateProducts.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.status = "loaded"
      })
      .addCase(fetchCreateProducts.rejected, (state) => {
        state.items = []
        state.status = "loading"
      })

      //Create Image
      .addCase(fetchUploadImageCreate.pending, (state) => {
        state.items = []
        state.status = "loading"
      })
      .addCase(fetchUploadImageCreate.fulfilled, (state, action) => {
        state.imageCreate = action.payload
        state.status = "loaded"
      })
      .addCase(fetchUploadImageCreate.rejected, (state) => {
        state.items = []
        state.status = "loading"
      })

      //  Remove product
      .addCase(fetchRemoveProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload)
        state.status = "loaded"
      })

    // [fetchProducts.pending]: (state) => {
    //   state.items = []
    //   state.status = "loading"
    // },
    // [fetchProducts.fulfilled]: (state, action) => {
    //   state.items = action.payload
    //   state.status = "loaded"
    // },
    // [fetchProducts.rejected]: (state) => {
    //   state.items = []
    //   state.status = "loading"
    // },

    //Create Item
    // [fetchCreateProducts.pending]: (state) => {
    //   state.items = []
    //   state.status = "loading"
    // },
    // [fetchCreateProducts.fulfilled]: (state, action) => {
    //   state.items.push(action.payload)
    //   state.status = "loaded"
    // },
    // [fetchCreateProducts.rejected]: (state) => {
    // state.items = []
    // state.status = "loading"
    // },

    //Create Image
    // [fetchUploadImageCreate.pending]: (state) => {
    //   state.items = []
    //   state.status = "loading"
    // },
    // [fetchUploadImageCreate.fulfilled]: (state, action) => {
    //   state.imageCreate = action.payload
    //   state.status = "loaded"
    // },
    // [fetchUploadImageCreate.rejected]: (state) => {
    //   state.items = []
    //   state.status = "loading"
    // },

    // [fetchRemoveProduct.pending]: (state, action) => {
    //   console.log(action)
    //   state.items = state.items.filter((item) => item._id !== action.meta.arg)
    // },
  },
})

export const {
  addSearchText,
  addCaregoryValue,
  addSortedValue,
  removeImageCreate,
  clearProfile,
  removeProduct,
  clearAllFilter,
} = productsSlice.actions

//Select
export const selectProducts = (state: RootState) => state.products.items
export const selectImageCreate = (state: RootState) =>
  state.products.imageCreate
export const isStatus = (state: RootState) => state.products.status

export const productsReducer = productsSlice.reducer
