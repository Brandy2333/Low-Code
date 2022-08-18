import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './slice/data'
import { EditorConfig } from '../constant/index'
import counterSlice from './slice/counter'
// import counter from './slice/counter'

interface IProps {
  children: any
}
// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    data: dataSlice,
    counter1: counterSlice
  }
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
