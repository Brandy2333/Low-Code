import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slice/counter";

// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    counter: counterSlice
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch