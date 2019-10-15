import React from 'react'

interface Props {
  yes: () => void
  no: () => void
  msg: string
  userItem?: boolean
}

const Modal = ({yes, no, msg, userItem}: Props) => {

  return (
    <div className={userItem ? 'modal-user':'modal'}>
      <div className='modal-center'>
        {msg}
        <div className='modal-buttons'>
          <button onClick={yes}>Yes</button>
          <button onClick={no}>No</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
