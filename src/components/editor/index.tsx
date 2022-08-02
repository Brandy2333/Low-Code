import React, { FC, ReactElement, useContext, useMemo, useEffect, useRef } from 'react'
import { Block, Data } from '../../constant'
import { EditorConfigContext } from '../../context/editorConfig'
import './index.scss'
interface Porps {
  block: Block
  className: string
  setData: any
  onMouseDown: any
}
const EditorBlock: FC<Porps> = ({
  block,
  className,
  setData,
  onMouseDown
}): ReactElement => {
  let { top, left, zIndex, key } = block
  const blockStyle = useMemo(() => ({
    top: `${top}px`,
    left: `${left}px`,
    zIndex
  }), [top, left, zIndex])
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
        let newBlocks = data.blocks.map(tempBlock => {
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
