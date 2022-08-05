import { useState, useRef } from 'react'
import './index.scss'

interface Block {
  label: string
  preview: () => any
  render: () => any
  key: string
}
// interface cMap{key:Block,val:}

// // 列表区显示所有的物料
// // 注册函数
function createEditorConfig() {
  const componentList: any[] = []
  const conponentMap: any = {}
  return {
    componentList,
    conponentMap,
    register: (component: Block) => {
      componentList.push(component)
      conponentMap[component.key] = component
    }
  }
}

let registerConfig = createEditorConfig()
registerConfig.register({
  label: '文本',
  preview: () => '预览文本',
  render: () => '渲染文本',
  key: 'text'
})

registerConfig.register({
  label: '按钮',
  preview: () => <button>预览按钮</button>,
  render: () => <button>渲染按钮</button>,
  key: 'button'
})

registerConfig.register({
  label: '输入框',
  preview: () => <input placeholder='预览输入框' />,
  render: () => <input placeholder='渲染输入框' />,
  key: 'input'
})

const dragenter = (e: any) => {
  e.dataTransfer.dropEffect = 'move'
}
const dragover = (e: any) => {
  e.preventDefault()
}
const dragleave = (e: any) => {
  e.dataTransfer.dropEffect = 'none'
}
const drop = (e: any) => {
  // let blocks = data.value.blocks
  // data.value
}

console.log(registerConfig)

const dragStart = (e: DragEvent, component: HTMLDivElement): HTMLDivElement => {
  // dragenter 进入元素中
  // dragover 在目标元素经过 必须阻止默认行为，否则不能触发drop
  // dragleave 离开元素的时候，需添加一个禁用标识。
  // drop 松手时 根据拖拽的组件，添加一个组件。
  console.log(e, component)
  const node: any = containerRef.current
  // node.value.addEventListener('dragenter', dragenter)
  // containerRef.current.value.addEventListener('dragover', dragover)
  // containerRef.current.value.addEventListener('dragleave', dragleave)
  // // containerRef.current.value.addEventListener('dragenter', )
  // containerRef.current.value.addEventListener('drop', drop)

  return <div>{component}</div>
}

function Components() {
  // 获取真实dom元素
  const containerRef = useRef<HTMLDivElement>(null)
  console.log(containerRef)

  return (
    <div
      className='App'
      draggable='true'
      onDragStart={dragStart as any}
      ref={containerRef}
    >
      <p className='ppp'>lalala</p>
    </div>
  )
}

export default Components
