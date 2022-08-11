// 编辑区域Block信息
export interface Block {
  id: number
  top: number
  left: number
  zIndex: number
  key: string
  alignCenter?: boolean
  focus?: boolean
}

// json配置信息
export interface Data {
  container: {
    width: number
    height: number
  }
  blocks: Array<Block>
}

// 组件参数信息
export interface Component {
  label: string
  preview: Function
  render: Function
  key: string
}

// 组件映射关系
export interface ComponentMap {
  [key: string]: Component
}

// 组件配置信息
export interface EditorConfig {
  componentList: Component[]
  componentListMap: ComponentMap
  register: Function
}
