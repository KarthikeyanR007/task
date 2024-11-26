import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    aboutName: '',
    aboutDescription: '',
    images: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setAboutName: (state, action) => {
        state.aboutName = action.payload;
      },
    setAboutDescription: (state, action) => {
      state.aboutDescription = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
  },
});

export const { setAboutDescription, setImages } = formSlice.actions;

export default formSlice.reducer;
