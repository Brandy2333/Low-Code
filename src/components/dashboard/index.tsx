import { FC, ReactElement, useMemo, useContext, useRef } from 'react'
import { Component, Data } from "../../constant"
import { EditorConfigContext } from '../../context/editorConfig'
import { useMenuDragger } from './useMenuDragger'
import { useFocus } from './useFocus'
import EditorBlock from '../editor'
import './index.scss'
import { useBlockDragger } from './useBlockDragger'
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
  // 修改useMemo computute计算
  const contentStyle = useMemo(() => ({
    height,
    width
  }), [height, width])
  const { editorConfig } = useContext(EditorConfigContext)
  const contentRef = useRef<any>(null)
  // 自定义hook实现从菜单拖拽到内容区功能
  const { handleDragStart, handleDragEnd } = useMenuDragger(contentRef, setData)
  // 自定义hook实现单选与多选
  const { handleOnMousedown, clearSelect, focusData } = useFocus(data, setData, (e: MouseEvent) => {
    mouseDown(e)
  })
  // 自定义hook实现内容区内部拖拽
  const { mouseDown } = useBlockDragger(focusData, setData)

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
