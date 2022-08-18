import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index'
import data from '../../data.json'
import { Data, Block, Component } from '../../constant'
// 注册函数
import { registerConfig } from '../../utils/editorConfig'
const initState: Data = {
  container: {
    width: 800,
    height: 2000
  },
  blocks: [
    { id: 0, top: 100, left: 100, zIndex: 1, key: 'text' },
    { id: 1, top: 200, left: 200, zIndex: 1, key: 'button' }
  ]
}
// interface IFocusData {
//   focus: Block[]
//   unfocus: Block[]
// }
interface IpropsLeft {
  index: number
  left: number
}
interface IpropsTop {
  index: number
  top: number
}
// 创建一个 Slice
export const dataSlice = createSlice({
  name: 'ata',
  initialState: initState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    updateBlocks: (state, action: PayloadAction<Array<Block>>) => {
      state.blocks = action.payload
    },
    updateAttributeLeft: (state, action: PayloadAction<IpropsLeft>) => {
      state.blocks[action.payload.index].left -= action.payload.left / 2
    },
    moveAttributeLeft: (state, action: PayloadAction<IpropsLeft>) => {
      state.blocks[action.payload.index].left = action.payload.left -260
    },
    updateAttributeTop: (state, action: PayloadAction<IpropsTop>) => {
      state.blocks[action.payload.index].top -= action.payload.top / 2
    },
    moveAttributeTop: (state, action: PayloadAction<IpropsTop>) => {
      state.blocks[action.payload.index].top = action.payload.top - 90
    },
    updateAttributeAlignCenter: (state, action: PayloadAction<number>) => {
      state.blocks[action.payload].alignCenter = false
    },
    updateAttributeFocus: (state, action: PayloadAction<number>) => {
      state.blocks[action.payload].focus = !state.blocks[action.payload].focus
    },
    setAttributeFocusFalse: (state, action: PayloadAction<number>) => {
      state.blocks[action.payload].focus = false
    }
  }
})

export const {
  updateBlocks,
  updateAttributeLeft,
  moveAttributeLeft,
  updateAttributeTop,
  moveAttributeTop,
  updateAttributeAlignCenter,
  updateAttributeFocus,
  setAttributeFocusFalse
} = dataSlice.actions
// export const selectCount = (state: RootState) => state.data.value
// 默认导出
export default dataSlice.reducer
