import React, {
  FC,
  ReactElement,
  useContext,
  useMemo,
  useEffect,
  useRef,
  MouseEventHandler
} from 'react'
import { Block, Data } from '../../constant'
import { EditorConfigContext } from '../../context/editorConfig'
import './index.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  updateAttributeAlignCenter,
  updateAttributeLeft,
  updateAttributeTop
} from '../../store/slice/data'

interface Porps {
  block: Block
  className: string
  setData?: any
  onMouseDown: MouseEventHandler<HTMLDivElement>
}

const EditorBlock: FC<Porps> = ({
  block,
  className,
  setData,
  onMouseDown
}): ReactElement => {
  let { top, left, zIndex, key } = block
  const blockStyle = useMemo(
    () => ({
      top: `${top}px`,
      left: `${left}px`,
      zIndex
    }),
    [top, left, zIndex]
  )
  const blockRef = useRef<any>(null)
  const { editorConfig } = useContext(EditorConfigContext)
  const component = editorConfig?.componentListMap?.[key]
  const renderComponent = component?.render()
  // console.log(`component`,component)
  // console.log(`componentListMap`,componentListMap)
  useEffect(() => {
    let { offsetWidth, offsetHeight } = blockRef.current
    if (block.alignCenter) {
      setData((data: Data) => {
        let newBlocks = data.blocks.map((tempBlock) => {
          if (tempBlock.id === block.id && block.alignCenter) {
            tempBlock.left -= offsetWidth / 2
            tempBlock.top -= offsetHeight / 2
            tempBlock.alignCenter = false
          }
          return tempBlock
        })
        return {
          ...data,
          blocks: newBlocks
        }
      })
    }
  }, [])
  return (
    <div
      className={`editor-block ${className}`}
      style={blockStyle}
      ref={blockRef}
      onMouseDown={onMouseDown}
    >
      {renderComponent}
    </div>
  )
}
export default EditorBlock

export const EditorBlock1: FC<Porps> = ({
  block,
  className,
  // draggable,
  onMouseDown
}): ReactElement => {
  let { top, left, zIndex, key } = block
  const blockStyle = useMemo(
    () => ({
      top: `${top}px`,
      left: `${left}px`,
      zIndex
    }),
    [top, left, zIndex]
  )
  const blockRef = useRef<any>(null)
  const { editorConfig } = useContext(EditorConfigContext)
  const component = editorConfig?.componentListMap?.[key]
  const renderComponent = component?.render()

  const data = useAppSelector((state) => state.data.blocks)
  const dispatch = useAppDispatch()
  useEffect(() => {
    let { offsetWidth, offsetHeight } = blockRef.current
    if (block.alignCenter) {
      // 设置依据鼠标位置偏移
      data.map((tempBlock, index) => {
        if (tempBlock.id === block.id && block.alignCenter) {
          let left = parseInt(offsetWidth),
            top = parseInt(offsetHeight)
          dispatch(updateAttributeLeft({ index, left }))
          dispatch(updateAttributeTop({ index, top }))
          dispatch(updateAttributeAlignCenter(index))
        }
      })
    }
  }, [])
  return (
    <div
      className={`editor-block ${className}`}
      style={blockStyle}
      ref={blockRef}
      // draggable
      onMouseDown={onMouseDown}
    >
      {renderComponent}
    </div>
  )
}
