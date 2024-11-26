import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  benefits: ["Avoid talking about politics", "Avoid talking about religion"],
  additionalDetails: [{ attribute: 'Attribute', value: 'Value' }],
  category: "",
};

const additionalDetailsSlice = createSlice({
  name: 'additionalDetails',
  initialState,
  reducers: {
    setBenefits: (state, action) => {
      state.benefits = action.payload;
    },
    setAdditionalDetails: (state, action) => {
      state.additionalDetails = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { setBenefits, setAdditionalDetails, setCategory } = additionalDetailsSlice.actions;

export default additionalDetailsSlice.reducer;
