import { useState } from 'react'
import './index.scss'
import ReactDOM from 'react-dom/client'

// interface data {
//   arr: number | string[]
// }
// function Component(data: data) {}
// top:number,left:number,zindex:number

function View(props: any) {
  // console.log(props)
  // const dataList: string[] = []
  const { data, tag } = props
  const items = {
    top: 0,
    left: 0,
    zindex: 0,
    key: ''
  }
  // {items.top,items.left,items.zindex,items.key }  = {props.block.top, props.block.left,props.block.zindex,props.block.key}
  // console.log(props)
  // const item = () => {
  //   let block = data.blocks[0]
  const item = data.blocks.map((block: any) => {
    const blockStyles = {
      top: `${block.top}px`,
      left: `${block.left}px`,
      zIndex: `${block.zIndex}`
    }
    if (tag == '文本框') {
      return (
        <>
          <div className='' key={block.key} style={blockStyles}>
            <p>lalala</p>
          </div>
        </>
      )
    } else if (tag == '按钮') {
      return (
        <>
          <div className='' key={block.key} style={blockStyles}>
            <button>lalala</button>
          </div>
        </>
      )
    } else if (tag == '输入框') {
      return (
        <>
          <div className='' key={block.key} style={blockStyles}>
            <input />
          </div>
        </>
      )
    }
  })
  return (
    <div
      className='App'
      // style={blockStyles}
    >
      {item}
    </div>
  )
}

export default View
