import { DragEvent, MutableRefObject } from 'react'

import { Component, Data } from '../../constant'
import { events } from '../../utils/events'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import data, { updateBlocks } from '../../store/slice/data'

export function useMenuDragger(
  contentRef: MutableRefObject<any>,
  setData: (arg0: (data: Data) => Data) => void
) {
  let selectedComponent: Component | null = null

  // 进入元素，添加移动标识
  const dragenter = (e: DragEvent) => {
    e.dataTransfer.dropEffect = 'move'
  }

  // 元素经过，阻止默认事件，否则无法触发drop事件
  const dragover = (e: DragEvent) => {
    e.preventDefault()
  }

  // 离开元素，添加禁用按钮
  const dragleave = (e: DragEvent) => {
    e.dataTransfer.dropEffect = 'none'
  }

  // 松手，在内容区生成拖拽组件
  const drop = (e: MouseEvent) => {
    setData((data: Data) => {
      let type = selectedComponent?.key
      selectedComponent = null
      // 当type为null时不修改添加组件
      return !type
        ? data
        : {
            ...data,
            blocks: [
              ...data.blocks,
              {
                id: +new Date(),
                top: e.offsetY,
                left: e.offsetX,
                zIndex: 1,
                key: type,
                alignCenter: true
              }
            ]
          }
    })
  }

  const handleDragStart = (component: Component) => {
    if (contentRef.current) {
      selectedComponent = component
      contentRef.current.addEventListener('dragenter', dragenter)
      contentRef.current.addEventListener('dragover', dragover)
      contentRef.current.addEventListener('dragleave', dragleave)
      contentRef.current.addEventListener('drop', drop)
      // 拖拽前发布事件
      // events.emit('start')
    }
  }

  const handleDragEnd = () => {
    if (contentRef.current) {
      contentRef.current.removeEventListener('dragenter', dragenter)
      contentRef.current.removeEventListener('dragover', dragover)
      contentRef.current.removeEventListener('dragleave', dragleave)
      contentRef.current.removeEventListener('drop', drop)
      // 拖拽后发布事件
      // events.emit('push',data)
    }
  }
  return {
    handleDragStart,
    handleDragEnd
  }
}

//
//
// 通过useDispatch 派发事件
export function useMenuDragger1(contentRef: MutableRefObject<any>) {
  const data = useAppSelector((state) => state.data)
  console.log('store中的data', data)
  let selectedComponent: Component | null = null
  const dispatch = useAppDispatch()

  // 进入元素，添加移动标识
  const dragenter = (e: DragEvent) => {
    e.dataTransfer.dropEffect = 'move'
  }

  // 元素经过，阻止默认事件，否则无法触发drop事件
  const dragover = (e: DragEvent) => {
    e.preventDefault()
  }

  // 离开元素，添加禁用按钮
  const dragleave = (e: DragEvent) => {
    e.dataTransfer.dropEffect = 'none'
  }

  // 松手，在内容区生成拖拽组件
  const drop = (e: MouseEvent) => {
    // setData((data: Data) => {
    let type = selectedComponent?.key
    selectedComponent = null
    // 当type为null时不修改添加组件
    let res = !type
      ? data.blocks
      : [
            ...data.blocks,
            {
              id: +new Date(),
              top: e.offsetY,
              left: e.offsetX,
              zIndex: 1,
              key: type,
              alignCenter: true
            }
          ]
        
    console.log('drop的res:', res)

    dispatch(updateBlocks(res))

    // })
  }

  const handleDragStart = (component: Component) => {
    if (contentRef.current) {
      selectedComponent = component
      contentRef.current.addEventListener('dragenter', dragenter)
      contentRef.current.addEventListener('dragover', dragover)
      contentRef.current.addEventListener('dragleave', dragleave)
      contentRef.current.addEventListener('drop', drop)
      // 拖拽前发布事件
      // events.emit('start')
    }
  }

  const handleDragEnd = () => {
    if (contentRef.current) {
      contentRef.current.removeEventListener('dragenter', dragenter)
      contentRef.current.removeEventListener('dragover', dragover)
      contentRef.current.removeEventListener('dragleave', dragleave)
      contentRef.current.removeEventListener('drop', drop)
      // 拖拽后发布事件
      // events.emit('push',data)
      setTimeout(() => {
        console.log('拖拽后的store.state:', data)
      }, 0)
    }
  }
  return {
    handleDragStart,
    handleDragEnd
  }
}
