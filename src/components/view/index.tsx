import { useState } from 'react'
import './index.scss'
import ReactDOM from 'react-dom/client'

// interface data {
//   arr: number | string[]
// }
// function Component(data: data) {}

function View() {
  // const style1 = 'button'

  // const data = []
  // const test = ReactDOM.createRoot(
  //   document.getElementById('root') as HTMLElement
  // ).render(<h1>新渲染的</h1>)

  return (
    <div className='App'>
      {/* <{style1}><{style1} /> */}
      <p>View</p>
      <div>test</div>
    </div>
  )
}

export default View
