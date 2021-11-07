import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: false,
}

export const ModelSlice = createSlice({
  name: 'Model',
  initialState,
  reducers: {
    ShowModel: (state) => {
      state.value = !state.value;
    },
  },
})

// Action creators are generated for each case reducer function
export const { ShowModel,value } = ModelSlice.actions;
export const select = (state)=>state.Model.value;
export default ModelSlice.reducer;