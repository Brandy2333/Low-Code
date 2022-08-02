import { FC, ReactElement, useMemo, useContext, useRef } from 'react'
import { Component, Data } from "../../constant"
import { EditorConfigContext } from '../../context/editorConfig'
import { useMenuDragger } from './useMenuDragger'
import { useFocus } from './useFocus'
import EditorBlock from '../editor'
import './index.scss'
interface Porps {
  data: Data
  setData: any
}

const Editor: FC<Porps> = ({
  data,
  setData
}): ReactElement => {
  // console.log(`data`, data)
  const { height, width } = data.container
  let { blocks } = data
  const contentStyle = useMemo(() => ({
    height,
    width
  }), [height, width])
  const { editorConfig } = useContext(EditorConfigContext)
  const contentRef = useRef<any>(null)
  // 自定义hook实现从菜单拖拽到内容区功能
  const { handleDragStart, handleDragEnd } = useMenuDragger(contentRef, setData)
  // 自定义hook实现单选与多选
  const { handleOnMousedown, clearSelect, focusData } = useFocus(data, setData, (e: any) => {
    mouseDown(e)
  })
  // 自定义hook实现内容区内部拖拽
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
      let restBlocks = data.blocks.filter(block => !focusArray.includes(block.id))
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

  return (
    <div className='editor'>
      <div className='editor-left'>
        <div className='logo'>logo</div>
        <div className='component-list'>
          {editorConfig?.componentList.map((component: Component) => (
            <div
              className='component-list-item'
              key={component.key}
              draggable
              onDragStart={() => handleDragStart(component)}
              onDragEnd={handleDragEnd}
            >
              <span className='component-item-label'>{component.label}</span>
              <span>{component.preview()}</span>
            </div>
          ))}
        </div>
      </div>
      <div className='editor-container'>
        <div className='editor-nav'>
          nav
        </div>
        <div className='editor-wrapper'>
          <div className='editor-content'
            style={contentStyle}
            ref={contentRef}
            onMouseDown={clearSelect}
          >
            {blocks.map((block) => (
              <EditorBlock
                className={block.focus ? 'editor-block-focus' : ''}
                key={block.id}
                block={block}
                setData={setData}
                onMouseDown={(e: any) => handleOnMousedown(e, block)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='editor-right'>
        prop
      </div>
    </div>
  )
}
export default Editor
