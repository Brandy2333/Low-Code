import { FC, ReactElement, useMemo, useContext, useRef, useEffect } from 'react'
import { Component, Data } from '../../constant'
import { EditorConfigContext } from '../../context/editorConfig'
import { useMenuDragger, useMenuDragger1 } from './useMenuDragger'
import { useFocus, useFocus1 } from './useFocus'
import { EditorBlock1 } from '../editor'
import './index.scss'
import { useBlockDragger, useBlockDragger1 } from './useBlockDragger'
import { useCommand } from './useCommand'
import { useAppSelector, useAppDispatch } from '../../store/hooks'

interface Porps {
  data: Data
  setData: any
}

export const Editor: FC<Porps> = ({ data, setData }): ReactElement => {
  // 解构赋值，直接获取数值
  const { height, width } = data.container
  let { blocks } = data

  // 修改useMemo computute计算
  const contentStyle = useMemo(
    () => ({
      height,
      width
    }),
    [height, width]
  )
  const { editorConfig } = useContext(EditorConfigContext)

  const contentRef = useRef<any>(null)
  // 自定义hook实现从菜单拖拽到内容区功能
  // const { handleDragStart, handleDragEnd } = useMenuDragger(contentRef, setData, data)
  const { handleDragStart, handleDragEnd } = useMenuDragger(contentRef, setData)

  // 自定义hook实现单选与多选
  const { handleOnMousedown, clearSelect, focusData } = useFocus(
    data,
    setData,
    (e: MouseEvent) => {
      mouseDown(e)
    }
  )
  // 自定义hook实现内容区内部拖拽
  const { mouseDown } = useBlockDragger(focusData, setData)
  // 撤销按钮
  const { menu } = useCommand(data, setData)

  return (
    <div className='editor'>
      <div className='editor-left'>
        <div className='logo'>Low-Code demo</div>
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
        {/* 顶部菜单按钮区 */}
        <div className='editor-nav'>
          {menu.map((button) => (
            <div
              key={button.id}
              className='nav-operation'
              onClick={() => {
                button.handler()
              }}
            >
              {button.label}
            </div>
          ))}
        </div>
        {/* 内容编辑区 */}
        <div className='editor-wrapper'>
          <div
            className='editor-content'
            style={contentStyle}
            ref={contentRef}
            onMouseDown={clearSelect}
          >
            {blocks.map((block) => (
              <EditorBlock1
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
      <div className='editor-right'>prop</div>
    </div>
  )
}
export default Editor

//
//
//
export const Editor1: FC = (): ReactElement => {
  // 获取data数据
  const data = useAppSelector((state) => state.data)
  console.log('Editor中的data', data)

  const { height, width } = data.container
  let { blocks } = data

  // 修改useMemo computute计算
  const contentStyle = useMemo(
    () => ({
      height,
      width
    }),
    [height, width]
  )
  // console.log('Editor中的contentStyle', contentStyle)

  const { editorConfig } = useContext(EditorConfigContext)
  const contentRef = useRef<any>(null)
  // 自定义hook实现从菜单拖拽到内容区功能
  const { handleDragStart, handleDragEnd } = useMenuDragger1(contentRef)

  // 自定义hook实现单选与多选
  const { handleOnMousedown, clearSelect } = useFocus1((e: MouseEvent) => {
    mouseDown(e)
  })
  // 自定义hook实现内容区内部拖拽
  const { mouseDown } = useBlockDragger1()

  // 撤销按钮
  // const { menu } = useCommand(data, setData)
  // const { menu } = useCommand(data)

  return (
    <div className='editor'>
      <div className='editor-left'>
        <div className='logo'>Low-Code demo</div>
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
        {/* 顶部菜单按钮区 */}
        <div className='editor-nav'>
          {/* {menu.map((button) => (
            <div
              key={button.id}
              className='nav-operation'
              onClick={() => {
                button.handler()
              }}
            >
              {button.label}
            </div>
          ))} */}
        </div>
        {/* 内容编辑区 */}
        <div className='editor-wrapper'>
          <div
            className='editor-content'
            style={contentStyle}
            ref={contentRef}
            onMouseDown={clearSelect}
          >
            {blocks.map((block) => (
              <EditorBlock1
                className={block.focus ? 'editor-block-focus' : ''}
                key={block.id}
                block={block}
                onMouseDown={(e: any) => handleOnMousedown(e, block)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className='editor-right'>prop</div>
    </div>
  )
}
