import { useState } from 'react'
import './index.scss'
import Components from '../components'
import Editor from '../editor'
import Attribute from '../attribute'
import View from '../view'
import data from '../../data.json'
// console.log(data)

const lalala = 111111
function Index() {
  const [tag, setTag] = useState<string>('')
  function getComponentMsg(message: any) {
    setTag(message)

    console.log('传参:', tag)
  }
  return (
    // 主页
    <div className='index'>
      {/* 左侧组件区 */}
      <div className='left'>
        <Components />
      </div>
      {/* 中部菜单和视图区 */}
      <div className='middle'>
        {/* <Editor /> */}
        <div className='view'>
          <View data={data} tag={tag} />
        </div>
      </div>
      {/* 右侧属性区 */}
      <div className='right'>
        <Attribute />
      </div>
    </div>
  )
}

export default Index
