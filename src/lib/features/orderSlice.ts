import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface OrderItem {
  id: string
  type: 'laundry' | 'dry-cleaning' | 'ironing'
  quantity: number
  price: number
}

interface Order {
  _id: string
  items: OrderItem[]
  total: number
  status: 'pending' | 'processing' | 'completed' | 'delivered'
  pickupTime: string
  deliveryTime: string
  address: string
}

interface OrderState {
  orders: Order[]
  currentOrder: Order | null
  loading: boolean
  error: string | null
}

const initialState: OrderState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
}

export const fetchOrders = createAsyncThunk(
  'orders/fetch',
  async (userId: string) => {
    const response = await axios.get(`/api/orders?userId=${userId}`)
    return response.data
  }
)

export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderData: Partial<Order>) => {
    const response = await axios.post('/api/orders', orderData)
    return response.data
  }
)

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearData: (state) => {
      state.orders = []
      state.currentOrder = null
    },
    addToOrder: (state, action: PayloadAction<OrderItem>) => {
      if (state.currentOrder) {
        state.currentOrder.items.push(action.payload)
        state.currentOrder.total += action.payload.price
      }
    },
    removeFromOrder: (state, action: PayloadAction<string>) => {
      if (state.currentOrder) {
        const item = state.currentOrder.items.find(item => item.id === action.payload)
        if (item) {
          state.currentOrder.total -= item.price
          state.currentOrder.items = state.currentOrder.items.filter(item => item.id !== action.payload)
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload)
        state.currentOrder = null
      })
  },
})

export const { clearData, addToOrder, removeFromOrder } = orderSlice.actions
export default orderSlice.reducer