import { useContext, useEffect, useState } from 'react'
import Editor from './components/dashboard'
import data from './data.json'
import { registerConfig } from './utils/editorConfig'
import { EditorConfigContext } from './context/editorConfig'
import './App.scss'
// 导入TS类型
import { Data } from './constant'
// 导入仓库
import { increment, decrement } from "./store/slice/counter"

import { useAppDispatch, useAppSelector } from './store/hooks'

export default function App() {
  // 传递数据
  const { setEditorConfig } = useContext(EditorConfigContext)
  const [state, setState] = useState<Data>(data)
  useEffect(() => {
    setEditorConfig(registerConfig)

  }, [setEditorConfig])

  // 通过useSelector直接拿到store中定义的value
  const count = useAppSelector((state) => state.counter.value)
  // 通过useDispatch 派发事件
  const dispatch = useAppDispatch()


  return (
    <>
      <Editor data={state} setData={setState} />
      <p>{count}</p>
      <button
        onClick={() => {
          dispatch(increment())
        }}
      >
        加
      </button>
      <button
        onClick={() => {
          dispatch(decrement())
        }}
      >
        减
      </button>
    </>
  )
}
