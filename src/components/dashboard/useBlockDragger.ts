import { Block, Data } from '../../constant'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import {
  updateBlocks,
  moveAttributeLeft,
  moveAttributeTop
} from '../../store/slice/data'

interface IFocusData {
  focus: Block[]
  unfocus: Block[]
}
export function useBlockDragger(focusData: IFocusData, setData: any) {
  let dragStart: {
    startX: number
    startY: number
    startPos?: any[]
  } = {
    startX: 0,
    startY: 0
  }
  const mousemove = (e: MouseEvent) => {
    let { clientX, clientY } = e
    let dragX = clientX - dragStart.startX
    let dragY = clientY - dragStart.startY
    setData((data: Data) => {
      // 选中的元素修改block的left和top值，修改位置
      let newFocusBlocks = focusData.focus.map((block, index) => {
        // 当dragStart.startPos中对应值存在时才移动
        block.left = dragStart.startPos?.[index]?.left + dragX
        block.top = dragStart.startPos?.[index]?.top + dragY
        return block
      })
      let focusArray = focusData.focus.map((block) => block.id)
      // 未选中的block不用动
      let restBlocks = data.blocks.filter(
        (block) => !focusArray.includes(block.id)
      )
      return {
        ...data,
        blocks: [...newFocusBlocks, ...restBlocks]
      }
    })
  }
  const mouseup = (e: MouseEvent) => {
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  }
  const mouseDown = (e: MouseEvent) => {
    dragStart = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: focusData.focus.map(({ id, top, left }) => ({ id, top, left }))
    }
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
  }
  return {
    mouseDown
  }
}

//
//
//

export function useBlockDragger1() {
  const data = useAppSelector((state) => state.data.blocks)
  // 通过useDispatch 派发事件
  const dispatch = useAppDispatch()
  let dragStart: {
    startX: number
    startY: number
    startPos?: any[]
  } = {
    startX: 0,
    startY: 0
  }
  console.log('dragStart:', dragStart)

  const mousemove = (e: MouseEvent) => {
    let { clientX, clientY } = e
    let dragX = clientX - dragStart.startX
    let dragY = clientY - dragStart.startY
    // 选中的元素修改block的left和top值，修改位置
    data.map((block, index) => {
      if (block.focus) {
        let left = clientX
        let top = clientY
        // let id = dragStart.startPos?.[index].id
        dispatch(moveAttributeLeft({ index, left }))
        dispatch(moveAttributeTop({ index, top }))
      }
    })
  }
  const mouseup = (e: MouseEvent) => {
    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseup)
  }
  const mouseDown = (e: MouseEvent) => {
    dragStart = {
      startX: e.clientX,
      startY: e.clientY,
      startPos: data.map(({ id, focus, top, left }) => {
        if (focus) {
          return { id, top, left }
        }
      })
    }
    // console.log('dragStart:', dragStart)

    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseup)
  }
  return {
    mouseDown
  }
}
