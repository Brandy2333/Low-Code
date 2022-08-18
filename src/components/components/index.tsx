import { useState, useRef } from 'react'
import {
  SwitcherOutlined,
  PictureOutlined,
  FileTextOutlined,
  EditOutlined
} from '@ant-design/icons'
import './index.scss'

interface Block {
  label: string
  preview: () => any
  render: () => any
  key: string
}

// 列表区显示所有的物料
// 注册函数
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

// console.log(registerConfig)

function Items(props: any) {
  const containerRef = useRef<HTMLDivElement>(null)
  // console.log(e)
  const dragStart = (e: any): void => {
    setTimeout(getComponentMsg(e.target.textContent), 1000)

    // console.log(e.target.textContent)
    // dragenter 进入元素中
    // dragover 在目标元素经过 必须阻止默认行为，否则不能触发drop
    // dragleave 离开元素的时候，需添加一个禁用标识。
    // drop 松手时 根据拖拽的组件，添加一个组件。
    // const node: any = containerRef.current
    // node.value.addEventListener('dragenter', dragenter)
    // if (!!containerRef.current.value != null) {
    // containerRef.current.value.addEventListener('dragover', dragover)
    // containerRef.current.value.addEventListener('dragleave', dragleave)
    // // containerRef.current.value.addEventListener('dragenter', )
    // containerRef.current.value.addEventListener('drop', drop)
    // }
    // return <div>{component}</div>
  }
  const getComponentMsg = props.getComponentMsg

  return (
    <>
      <div
        className='items'
        draggable='true'
        ref={containerRef}
        onDragStart={(e) => dragStart(e) as any}
      >
        <SwitcherOutlined />
        <p className='describe'>按钮</p>
      </div>
      <div
        className='items'
        draggable='true'
        onDragStart={dragStart as any}
        ref={containerRef}
      >
        <PictureOutlined />
        <p className='describe'>图片</p>
      </div>
      <div
        className='items'
        draggable='true'
        onDragStart={dragStart as any}
        ref={containerRef}
      >
        <FileTextOutlined />
        <p className='describe'>文本框</p>
      </div>
      <div
        className='items'
        draggable='true'
        onDragStart={dragStart as any}
        ref={containerRef}
      >
        <EditOutlined />
        <p className='describe'>输入框</p>
      </div>
    </>
  )
}

function Components(props: any) {
  // 获取真实dom元素
  const containerRef = useRef<HTMLDivElement>(null)
  // console.log('ref', containerRef)

  return (
    <div
      className='Components'
      // ref={containerRef}
    >
      <Items getComponentMsg={props.getComponentMsg} />
    </div>
  )
}

export default Components
