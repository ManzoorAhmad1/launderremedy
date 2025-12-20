import orderService from '@/services/order.service';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

interface OrderState {
  step: number;
  selectedServicesList: any[];
  orderDetail: any;
  collection: any[];
  collection_day: any[];
  delivery: any[];
  delivery_day: any[];
  orders: any[];
  totalOrders: number | null;
  orderCount: any[];
  isOrderLoading: boolean;
  isCollectionLoading: boolean;
  isDeliveryLoading: boolean;
  selectedSidebar: string;
}

const initialState: OrderState = {
  step: 1,
  selectedServicesList: [],
  orderDetail: {},
  collection: [],
  collection_day: [],
  delivery: [],
  delivery_day: [],
  orders: [],
  totalOrders: null,
  orderCount: [],
  isOrderLoading: false,
  isCollectionLoading: false,
  isDeliveryLoading: false,
  selectedSidebar: 'Dashboard',
};

// Async thunk for getting collection slots
export const getSelectionDetails = createAsyncThunk(
  'order/getSelectionDetails',
  async (date: string) => {
    const response = await orderService.getSelectionDetails(date);
    return response;
  }
);

// Async thunk for getting delivery slots
export const getDeliveryDetails = createAsyncThunk(
  'order/getDeliveryDetails',
  async (date: string) => {
    const response = await orderService.getDeliveryDetails(date);
    return response;
  }
);

// Async thunk for getting all orders
export const getAllOrdersOfUser = createAsyncThunk(
  'order/getAllOrdersOfUser',
  async (payload: {
    page?: number;
    pageSize?: number;
    status?: string;
    searchText?: string;
  }) => {
    const response = await orderService.getAllOrdersOfUser(payload);
    return response;
  }
);

// Async thunk for deleting/canceling order
export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async ({ id, type }: { id: string; type: 'cancel' | 'complete' }) => {
    const response = await orderService.deleteOrder(id, type);
    return response;
  }
);

// Async thunk for getting all categories/services
export const getAllCategories = createAsyncThunk(
  'order/getAllCategories',
  async () => {
    const response = await orderService.getCategoriesList();
    return response;
  }
);

// Async thunk for getting orders count
export const getOrdersCount = createAsyncThunk(
  'order/getOrdersCount',
  async () => {
    const response = await orderService.getOrdersCount();
    return response;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setStep: (state) => {
      state.step = state.step + 1;
    },
    setStepByValue: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    clearData: (state) => {
      state.step = 1;
      state.selectedServicesList = [];
      state.orderDetail = {};
    },
    setOrderData: (state, action: PayloadAction<any>) => {
      state.orderDetail = { ...state.orderDetail, ...action.payload };
    },
    setSideBarIndex: (state, action: PayloadAction<string>) => {
      state.selectedSidebar = action.payload;
    },
    setSelectedServicesListFull: (state, action: PayloadAction<any[]>) => {
      state.selectedServicesList = action.payload;
    },
    // In your orderSlice.ts, update the setSelectedServicesList reducer:
    setSelectedServicesList: (state, action: PayloadAction<{ data: any, type: string }>) => {
      const subcategory = action.payload.data;
      const type = action.payload.type;

      if (!subcategory || !subcategory._id) {
        console.error('Invalid subcategory data:', subcategory);
        return;
      }

      const existingIndex = state.selectedServicesList.findIndex(
        (item) => item?._id === subcategory?._id
      );

      if (existingIndex >= 0) {
        // Item exists in cart
        const updatedList = [...state.selectedServicesList];
        const existingItem = updatedList[existingIndex];

        if (type === '+') {
          // Add quantity
          updatedList[existingIndex] = {
            ...existingItem,
            quantity: (existingItem.quantity || 1) + 1
          };
        } else if (type === '-') {
          // Subtract quantity or remove
          const newQuantity = Math.max((existingItem.quantity || 1) - 1, 0);
          if (newQuantity === 0) {
            updatedList.splice(existingIndex, 1); // Remove item
          } else {
            updatedList[existingIndex] = {
              ...existingItem,
              quantity: newQuantity
            };
          }
        }

        state.selectedServicesList = updatedList;
      } else if (type === '+') {
        // Item doesn't exist and we're adding it
        const newItem = {
          ...subcategory,
          quantity: subcategory.quantity || 1
        };
        state.selectedServicesList = [...state.selectedServicesList, newItem];
      }

      console.log('Updated cart:', state.selectedServicesList);
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
      // Get collection details cases
      .addCase(getSelectionDetails.pending, (state) => {
        state.isCollectionLoading = true;
      })
      .addCase(getSelectionDetails.fulfilled, (state, action) => {
        state.isCollectionLoading = false;
        state.collection_day = action.payload.data
          .map((ele: any) => {
            return { label: ele.label, value: ele.timestamp };
          })
          .sort((a: any, b: any) => new Date(a.value).getTime() - new Date(b.value).getTime());
        state.collection = action.payload.data;
      })
      .addCase(getSelectionDetails.rejected, (state) => {
        state.isCollectionLoading = false;
        toast.error('Failed to load collection slots');
      })
      // Get delivery details cases
      .addCase(getDeliveryDetails.pending, (state) => {
        state.isDeliveryLoading = true;
      })
      .addCase(getDeliveryDetails.fulfilled, (state, action) => {
        state.isDeliveryLoading = false;
        state.delivery_day = action.payload.data
          .map((ele: any) => {
            return { label: ele.label, value: ele.timestamp };
          })
          .sort((a: any, b: any) => new Date(a.value).getTime() - new Date(b.value).getTime());
        state.delivery = action.payload.data;
      })
      .addCase(getDeliveryDetails.rejected, (state) => {
        state.isDeliveryLoading = false;
        toast.error('Failed to load delivery slots');
      })
      // Get all orders cases
      .addCase(getAllOrdersOfUser.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getAllOrdersOfUser.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalItems;
      })
      .addCase(getAllOrdersOfUser.rejected, (state) => {
        state.isOrderLoading = false;
        toast.error('Failed to load orders');
      })
      // Delete order cases
      .addCase(deleteOrder.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        toast.success(action.payload.message || 'Order updated successfully');
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.isOrderLoading = false;
        toast.error('Failed to update order');
      })
      // Get orders count cases
      .addCase(getOrdersCount.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getOrdersCount.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderCount = action.payload.data;
      })
      .addCase(getOrdersCount.rejected, (state) => {
        state.isOrderLoading = false;
      })
      // Get all categories cases
      .addCase(getAllCategories.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state) => {
        state.isOrderLoading = false;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.isOrderLoading = false;
        toast.error('Failed to load services');
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
  setSideBarIndex,
  setCollectionTimes,
  setDeliveryTimes,
} = orderSlice.actions;

export default orderSlice.reducer;