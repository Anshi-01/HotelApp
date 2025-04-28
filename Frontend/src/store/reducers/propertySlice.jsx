import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  properties: [],
  isPropertiesloading: false,
  error: null,
};

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    fetchPropertiesStart(state) {
      state.isPropertiesloading = true;
    },
    fetchPropertiesSuccess(state, action) {
      state.isPropertiesloading = false;
      state.properties = action.payload;
    },
    fetchPropertiesFailure(state, action) {
      state.isPropertiesloading = false;
      state.error = action.payload;
    },
    editProperty(state, action) {
      const updatedProperty = action.payload;
      const index = state.properties.findIndex(property => property._id === updatedProperty._id);
    
      if (index !== -1) {
        state.properties[index] = updatedProperty;
      }
    }

  },
});

export const {
  fetchPropertiesFailure,
  fetchPropertiesStart,
  fetchPropertiesSuccess,
  editProperty,
} = propertySlice.actions;

export default propertySlice.reducer;
