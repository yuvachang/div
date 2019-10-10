import React from 'react'

interface Props {
  yes: () => void
  no: () => void
  msg: string
}

const Modal = (props: Props) => {
  return (
    <div className='modal'>
      <div className='modal-center'>
        {props.msg}
        <div className='modal-buttons'>
          <button onClick={props.yes}>Yes</button>
          <button onClick={props.no}>No</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
