import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import aboutReducer from './aboutSlice';
import additionalDetailsReducer from './additionalDetailsSlice';
import formReducer from './formSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    about: aboutReducer,
    additionalDetails: additionalDetailsReducer,
    form: formReducer,
  },
});

export default store;
