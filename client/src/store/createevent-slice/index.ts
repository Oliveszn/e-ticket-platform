// formSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  step: number;
  data: Record<string, any>;
}

const initialState: FormState = {
  step: 0,
  data: {},
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    saveData: (state, action: PayloadAction<Record<string, any>>) => {
      state.data = { ...state.data, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { setStep, saveData, resetForm } = formSlice.actions;
export default formSlice.reducer;
