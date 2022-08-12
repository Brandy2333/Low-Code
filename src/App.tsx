import { useContext, useEffect, useState } from 'react'
import Editor from './components/dashboard'
import data from './data.json'
import { registerConfig } from './utils/editorConfig'
import { EditorConfigContext } from './context/editorConfig'
import './App.scss'
// 导入TS类型
import { Data } from './constant'

import { createStore } from 'redux';

import { Provider } from 'react-redux'
export default function App() {
  // 传递数据
  const { setEditorConfig } = useContext(EditorConfigContext)
  const [state, setState] = useState<Data>(data)
  useEffect(() => {
    setEditorConfig(registerConfig)
  }, [setEditorConfig])
  // useEffect(() => {
  //   console.log(`state`,state)
  // }, [state])
  // console.log(`config`, config.setEditorConfig)
  return (
    <>
      <Editor data={state} setData={setState} />
    </>
  )
}
