import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// -------------------------------------------------------------------------------------------

import  utilReducer  from "../features/utilSlice";

// -------------------------------------------------------------------------------------------

// Configure persist for each reducer if needed

// const utilPersistConfig = {
//     key: "util",
//     storage,
// }



// -------------------------------------------------------------------------------------------
// Applying persistReducer to each slice reducer
// const persistedUtilReducer = persistReducer(utilPersistConfig, utilReducer);
// -------------------------------------------------------------------------------------------


// Configure the store with persisted reducers
export const store = configureStore({
  reducer: {
    util: utilReducer,
    
  },
});

// Persist the store
// export const persistor = persistStore(store);
