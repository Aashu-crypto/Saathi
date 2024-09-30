import { configureStore, combineReducers } from "@reduxjs/toolkit";
import indexSlice from "./Slice/indexSlice";
import screenSlice from "./Slice/screenNameSlice";
import profileSlice from "./Slice/ProfileDataSlice";
import BookingSlice from "./Slice/BookingSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import AsyncStorage from "@react-native-async-storage/async-storage";
import heightSlice from "./Slice/heightSlice";
import articleIdSlice from "./Slice/ArticleIdSlice";
import { tokenSlice } from "./Slice/TokenSlice";
import packageSlice from "./Slice/packageSlice";
import userPackageSlice from "./Slice/UserPackageSlice";
const rootReducer = combineReducers({
  screen: screenSlice,
  height: heightSlice,
  index: indexSlice,
  userPackage: userPackageSlice,
  subscriptionPackages: packageSlice,
  profile: profileSlice,
  articleId: articleIdSlice,
  booking: BookingSlice,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["screen", "index", "height", "article"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
