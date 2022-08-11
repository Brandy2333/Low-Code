import deepcopy from 'deepcopy'
import { useCallback, useEffect, useState } from 'react'
import { Data } from '../../constant'
import { deepCompare } from '../../utils/common'

interface IState {
  // 前进后退的索引值
  currentIdinx: number
  // 所有的操作指令
  historyArray: Data[]
  // 最多可以存多少条历史记录
  maxCacheNumber: number
}

export function useCommand(data: Data, setData: any) {
  const [state, setState] = useState<IState>({
    currentIdinx: -1,
    historyArray: [],
    maxCacheNumber: 3
  })

  // 往数组添加数据
  const push = (record: Data) => {
    if (state.currentIdinx !== state.historyArray.length - 1) {
      removeHistory()
      console.log(`remove history`)
    }
    setState((state: IState) => {
      return {
        ...state,
        currentIdinx: state.historyArray.length,
        historyArray: [...state.historyArray, record]
      }
    })
    adjustCache()
  }

  // 当history数组中保存操作数量大于最大缓存数量时，删除最早保存的操作
  const adjustCache = () => {
    if (state.historyArray.length > state.maxCacheNumber) {
      setState((state: IState) => {
        let newArr = deepcopy(state.historyArray)
        newArr.splice(0, 1)
        return {
          ...state,
          currentIdinx: state.currentIdinx - 1,
          historyArray: newArr
        }
      })
    }
  }

  // 当用户撤销的时候，在某个节点停住，重新开始修改，新的操作历史进来之前，需要将当前撤销步骤后面所有的历史清除
  const removeHistory = () => {
    setState((state) => {
      let newArr = deepcopy(state.historyArray)
      newArr.splice(state.currentIdinx, state.historyArray.length)
      return {
        ...state,
        historyArray: newArr
      }
    })
  }

  // 重做(ctrl+y) currentIdinx指针后移一位
  const redo = () => {
    console.log(`redo`, state)
    // 当指针指向最后一个元素表示已经是最新状态，停止右移
    if (state.currentIdinx >= state.historyArray.length - 1) return
    setState((state) => {
      return {
        ...state,
        currentIdinx: state.currentIdinx + 1
      }
    })
    setData(() => ({ ...state.historyArray[state.currentIdinx + 1] }))
  }

  // 撤回(ctrl+z) currentIdinx指针前移一位
  const undo = () => {
    // 当指针指向0表示已经是最初，无法再回撤
    if (state.currentIdinx <= 0) return
    setState((state) => {
      return {
        ...state,
        currentIdinx: state.currentIdinx - 1
      }
    })
    setData(() => ({ ...state.historyArray[state.currentIdinx - 1] }))
  }
  // 监听按钮事件
  const handleKeyown = (e: any) => {
    if (e.ctrlKey) {
      if (e.key === 'z') {
        console.log(`ctrl+z`)
        undo()
      }
      if (e.key === 'y') {
        console.log(`ctrl+y`)
        redo()
      }
    }
  }

  // 功能区菜单
  const menu = [
    { id: 0, label: '撤回', handler: undo },
    { id: 1, label: '重做', handler: redo }
  ]

  // 绑定键盘事件
  useEffect(() => {
    document.removeEventListener('keydown', handleKeyown)
    document.addEventListener('keydown', handleKeyown)
    return () => {
      document.removeEventListener('keydown', handleKeyown)
    }
  }, [state])
  // 当data数据变化时加入进historyArray里
  useEffect(() => {
    // 当新元素和当前数组指向的元素不同时才能加入
    if (!deepCompare(data, state.historyArray[state.currentIdinx])) {
      push(data)
    }
  }, [data])

  return {
    push,
    menu
  }
}
