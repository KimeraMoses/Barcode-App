import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  primaryColor: '#096DD9',
  secondaryColor: '#13C2C2'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setPrimaryColor: (state, { payload }) => {
      state.primaryColor = payload;
    },
    setSecondaryColor: (state, { payload }) => {
      state.secondaryColor = payload;
    }
  }
});

const { reducer, actions } = themeSlice;

export const { setPrimaryColor, setSecondaryColor } = actions;

export default reducer;
