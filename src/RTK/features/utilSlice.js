import { createSlice } from "@reduxjs/toolkit";

const initialState = {
//   studentDetail: {},
//   subjectName: "",
//   chapterName: "",
  mnemonic: "",
  seed: "",
};

export const utilSlice = createSlice({
  name: "util",
  initialState,
  reducers: {
    setMnemonic: (state,action) => {
        state.mnemonic = action.payload.mnemonic;
       
    },
    setSeed: (state, action) => {
        state.seed = action.payload.seed;
      
    }
  }
});

export const { setMnemonic, setSeed } = utilSlice.actions;


// Thunk for setting mnemonic and seed
export const saveMnemonicAndSeed = (mnemonic, seed) => async (dispatch) => {
  dispatch(setMnemonic({ mnemonic }));
  dispatch(setSeed({ seed }));
};

export default utilSlice.reducer;
