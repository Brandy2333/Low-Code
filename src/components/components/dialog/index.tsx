import React, { useState, FC, createElement, ChangeEvent } from 'react'
import ReactDOM from 'react-dom/client'
import { Input, Button, Modal } from 'antd'
import { render } from 'react-dom'

interface IProps {
  type: string
  title: string
  content: string
  onConfirm?: any
}

const { TextArea } = Input
let dialogContainer: HTMLElement
let root: ReactDOM.Root

const Dialog: FC<IProps> = ({
  type,
  title,
  content,
  onConfirm
}) => {
  const [isModalVisible, setIsModalVisible] = useState(true)
  const [textarea, setTextarea] = useState(content)

  const closeDialog = () => {
    setIsModalVisible(false)
    root.unmount()
  }

  const handleOk = () => {
    onConfirm && onConfirm(textarea)
    closeDialog()
    setTextarea('')
  }

  const handleCancel = () => {
    closeDialog()
    setTextarea('')
  }

  return (
    <>
      <Modal
        title={title}
        visible={isModalVisible}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <TextArea rows={4} value={textarea} onChange={(e) => { setTextarea(e.target.value) }} />
      </Modal>
    </>
  )
}

export default function useDialog(option: IProps) {
  dialogContainer = document.createElement('div')
  root = ReactDOM.createRoot(dialogContainer as HTMLElement)
  root.render(<Dialog {...option} />)
}
