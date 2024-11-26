import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  aboutName: '',
  aboutDescription: '',
  images: [],
};

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    setAboutDescription: (state, action) => {
      state.aboutDescription = action.payload;
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setAboutName: (state, action) => {
      state.aboutName = action.payload;
    },
  },
});

export const { setAboutDescription, setImages, setAboutName } = aboutSlice.actions;

export default aboutSlice.reducer;
