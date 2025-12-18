import orderService from '@/services/order.service';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  step: number;
  selectedServicesList: any[];
  orderDetail: any;
  collection: any[];
  collection_day: any[];
  delivery: any[];
  delivery_day: any[];
  isCollectionLoading: boolean;
  isDeliveryLoading: boolean;
}

const initialState: OrderState = {
  step: 1,
  selectedServicesList: [],
  orderDetail: {},
  collection: [],
  collection_day: [],
  delivery: [],
  delivery_day: [],
  isCollectionLoading: false,
  isDeliveryLoading: false,
};

export const getSelectionDetails = createAsyncThunk(
  'order/getSelectionDetails',
  async (date: string) => {
    const response = await orderService.getCollectionTimes(date);
    return response.data;
  }
);

export const getDeliveryDetails:any = createAsyncThunk(
  'order/getDeliveryDetails',
  async (date: string) => {
    const response = await orderService.getDeliveryTimes(date);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setStep: (state) => {
      state.step += 1;
    },
    setStepByValue: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    clearData: (state) => {
      state.step = 1;
      state.selectedServicesList = [];
      state.orderDetail = {};
    },
    setSelectedServicesList: (state, action: PayloadAction<{data: any, type: string}>) => {
      const { data, type } = action.payload;
      
      if (type === "+") {
        const existingIndex = state.selectedServicesList.findIndex(
          item => item.id === data.id
        );
        
        if (existingIndex >= 0) {
          state.selectedServicesList[existingIndex].quantity += 1;
        } else {
          state.selectedServicesList.push({ ...data, quantity: 1 });
        }
      } else if (type === "-") {
        const existingIndex = state.selectedServicesList.findIndex(
          item => item.id === data.id
        );
        
        if (existingIndex >= 0) {
          if (state.selectedServicesList[existingIndex].quantity > 1) {
            state.selectedServicesList[existingIndex].quantity -= 1;
          } else {
            state.selectedServicesList.splice(existingIndex, 1);
          }
        }
      }
    },
    setSelectedServicesListFull: (state, action: PayloadAction<any[]>) => {
      state.selectedServicesList = action.payload;
    },
    setOrderData: (state, action: PayloadAction<any>) => {
      state.orderDetail = { ...state.orderDetail, ...action.payload };
    },
    setCollectionTimes: (state, action: PayloadAction<any>) => {
      state.collection = action.payload.collection;
      state.collection_day = action.payload.collection_day;
    },
    setDeliveryTimes: (state, action: PayloadAction<any>) => {
      state.delivery = action.payload.delivery;
      state.delivery_day = action.payload.delivery_day;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSelectionDetails.pending, (state) => {
        state.isCollectionLoading = true;
      })
      .addCase(getSelectionDetails.fulfilled, (state, action) => {
        state.isCollectionLoading = false;
        state.collection = action.payload.collection;
        state.collection_day = action.payload.collection_day;
      })
      .addCase(getSelectionDetails.rejected, (state) => {
        state.isCollectionLoading = false;
      })
      .addCase(getDeliveryDetails.pending, (state) => {
        state.isDeliveryLoading = true;
      })
      .addCase(getDeliveryDetails.fulfilled, (state, action) => {
        state.isDeliveryLoading = false;
        state.delivery = action.payload.delivery;
        state.delivery_day = action.payload.delivery_day;
      })
      .addCase(getDeliveryDetails.rejected, (state) => {
        state.isDeliveryLoading = false;
      });
  },
});

export const {
  setStep,
  setStepByValue,
  clearData,
  setSelectedServicesList,
  setSelectedServicesListFull,
  setOrderData,
  setCollectionTimes,
  setDeliveryTimes,
} = orderSlice.actions;

export default orderSlice.reducer;