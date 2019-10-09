import React from 'react'

interface Props {
  data?: Object
  useData?: () => void
}

const Modal = (props: Props) => {
  return (
    <div className='modal'>
      HELLO I AM IN THE MODAL
    </div>
  )
}

export default Modal
