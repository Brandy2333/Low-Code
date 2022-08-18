import { useMemo } from 'react'
import { Block, Data } from '../../constant'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  setAttributeFocusFalse,
  updateAttributeFocus,
  updateBlocks
} from '../../store/slice/data'

export function useFocus(data: Data, setData: any, callback: any) {
  // 保存选中和未选中block
  const focusData = useMemo(() => {
    const focus: Block[] = []
    const unfocus: Block[] = []
    data.blocks.forEach((block) => {
      ;(block.focus ? focus : unfocus).push(block)
    })
    return { focus, unfocus }
  }, [data.blocks])
  // 选中与取消选中block
  const handleOnMousedown = (e: MouseEvent, block: Block) => {
    e.preventDefault()
    e.stopPropagation()
    setData((data: Data) => {
      let newBlocks = data.blocks.map((tempBlock) => {
        // 按住shift多选
        if (e.shiftKey) {
          if (tempBlock.id === block.id) {
            tempBlock.focus = tempBlock.focus ? false : true
          }
          return tempBlock
        } else {
          if (tempBlock.id === block.id) {
            tempBlock.focus = tempBlock.focus ? false : true
          } else {
            tempBlock.focus = false
          }
        }
        return tempBlock
      })
      // console.log(`newBlocks`, newBlocks)
      callback(e)
      return {
        ...data,
        blocks: newBlocks
      }
    })
  }
  // 点击空白区域时清空所有选中block（先保证内部元素阻止冒泡）
  const clearSelect = () => {
    setData((data: Data) => {
      let newBlocks = data.blocks.map((tempBlock) => {
        tempBlock.focus = false
        return tempBlock
      })
      return {
        ...data,
        blocks: newBlocks
      }
    })
  }
  return {
    handleOnMousedown,
    focusData,
    clearSelect
  }
}

//
//
//

export function useFocus1(callback: any) {
  const data = useAppSelector((state) => state.data)
  const dispatch = useAppDispatch()

  // 选中与取消选中block
  const handleOnMousedown = (e: MouseEvent, block: Block) => {
    e.preventDefault()
    e.stopPropagation()
    data.blocks.map((tempBlock, index) => {
      // 按住shift多选
      if (e.shiftKey) {
        if (tempBlock.id === block.id) {
          dispatch(updateAttributeFocus(index))
        }
        return tempBlock
      } else {
        if (tempBlock.id === block.id) {
          dispatch(updateAttributeFocus(index))
        } else {
          dispatch(setAttributeFocusFalse(index))
        }
      }
    })
    callback(e)
  }
  // 点击空白区域时清空所有选中block（先保证内部元素阻止冒泡）
  const clearSelect = () => {
    data.blocks.map((tempBlock, index) => {
      dispatch(setAttributeFocusFalse(index))
    })
  }
  return {
    handleOnMousedown,
    clearSelect
  }
}
