import {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
  FC
} from 'react'
import { Editor1, Editor } from './components/dashboard'
import data1 from './data.json'
// 注册函数
import { registerConfig } from './utils/editorConfig'
import { EditorConfigContext } from './context/editorConfig'
import './App.scss'
// 导入TS类型
import { Block, Data } from './constant'
// 导入仓库
import { increment, decrement, incrementByAmount } from './store/slice/counter'

import { useAppDispatch, useAppSelector } from './store/hooks'

export default function App() {
  // 传递数据
  const { setEditorConfig } = useContext(EditorConfigContext)
  // console.log('setEditorConfig:', setEditorConfig)

  const [state, setState] = useState<Data>(data1)
  useEffect(() => {
    setEditorConfig(registerConfig)
  }, [setEditorConfig])

  // 拿到store中定义的value
  const count = useAppSelector((state) => state.counter1.value)

  const data = useAppSelector((state) => state.data.blocks)
  console.log('store中的data', data)

  // 通过useDispatch 派发事件
  const dispatch = useAppDispatch()

  return (
    <>
      {/* <Editor data={state} setData={setState} /> */}
      <Editor1 />
    </>
  )
}
