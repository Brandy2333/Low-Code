import { useContext, useEffect, useState } from "react"
import Editor from "./components/dashboard"
import data from './data.json'
import { registerConfig } from "./utils/editorConfig"
import { EditorConfigContext } from "./context/editorConfig"

import './App.scss'
import { Data } from "./constant"
export default function App() {
  const { setEditorConfig } = useContext(EditorConfigContext)
  const [state, setState] = useState<Data>(data)
  useEffect(() => {
    setEditorConfig(registerConfig)
  }, [])
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

