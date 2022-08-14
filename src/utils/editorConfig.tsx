import { Button } from "antd"
import { Component, ComponentMap, EditorConfig } from "../constant"

const createEditorConfig: Function = (): EditorConfig => {
  const componentList: Component[] = []
  const componentListMap: ComponentMap = {}
  return {
    componentList,
    componentListMap,
    register: (component: Component): void => {
      componentList.push(component)
      componentListMap[component.key] = component
    }
  }
}
export let registerConfig: EditorConfig = createEditorConfig()
registerConfig.register({
  label: '文本',
  preview: () => '预览文本',
  render: () => '渲染文本',
  key: 'text'
})
registerConfig.register({
  label: '按钮',
  preview: () => (<Button type="primary">预览按钮</Button>),
  render: () => (<Button type="primary">渲染按钮</Button>),
  key: 'button'
})
