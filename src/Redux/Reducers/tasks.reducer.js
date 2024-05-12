import { createSlice } from "@reduxjs/toolkit";

export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [], // Assuming this holds the tasks/items added to the cart
    prices: {
      1: 549,
      2: 899,
      3: 1249,
      4: 280,
      5: 499,
    },
  },
  reducers: {
    addQuantity: (state, action) => {
      // Add quantity to a specific product in the cart
      const { productId, quantity } = action.payload;
      const existingItem = state.tasks.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.tasks.push({ productId, quantity });
      }
    },
    deleteQuantity: (state, action) => {
      // Delete quantity from a specific product in the cart
      const { productId, quantity } = action.payload;
      const existingItem = state.tasks.find((item) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity -= quantity;
        if (existingItem.quantity <= 0) {
          // Remove the item from the cart if quantity becomes zero or negative
          state.tasks = state.tasks.filter((item) => item.productId !== productId);
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQuantity, deleteQuantity } = taskSlice.actions;
export default taskSlice.reducer;
