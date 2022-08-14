import { createContext, FC, ReactElement, useState } from 'react'
import { EditorConfig } from '../constant/index'
interface IProps {
  children: any
}
const EditorConfigContext = createContext<any>({})
const EditorConfigContextProvider: FC<IProps> = ({
  children
}): ReactElement => {
  const [editorConfig, setEditorConfig] = useState<EditorConfig>()
  return (
    <EditorConfigContext.Provider
      value={{
        // 组件配置数据
        editorConfig,
        // 修改组件配置数据钩子
        setEditorConfig
      }}
    >
      {children}
    </EditorConfigContext.Provider>
  )
}
export { EditorConfigContext, EditorConfigContextProvider }
