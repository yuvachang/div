import React, { useState, useEffect } from 'react'
import { UserObject } from '../../store/reducers/usersReducer'
import UserItemInputs from './UserItemInputs'

interface Props {
  user: UserObject
  idx: number
  deleteUser: () => void
}

const UserItem: React.FunctionComponent<Props> = props => {
  const [collapsed, setCollapse] = useState<boolean>(true)

  useEffect(() => {
    if (!props.user.name) {
      setCollapse(false)
    }
  }, [props.user.name])

  return (
    <div className='user-item'>
      <div className={`no-edit${collapsed ? ' collapsed' : ''}`}>
        <div className='name greytext'>{props.user.name || 'Name'}</div>
        <div className='amounts'>Paid: ${props.user.paid}</div>
        <div className='amounts'>Owe: ${props.user.oweAmount}</div>
        <div className='arrow' onClick={() => setCollapse(!collapsed)}>
          <img
            src='/icons/down-arrow.png'
            alt='open/close'
            className={`arrowicon${collapsed ? '' : ' flip'}`}
          />
        </div>
      </div>
      <div className={`edits${collapsed ? ' collapsed' : ''}`}>
        <UserItemInputs user={{ ...props.user }} idx={props.idx} />

        <div className='grey-button-container' style={{ marginTop: '5px' }}>
          <div className='grey-button tiny' onClick={props.deleteUser}>
            Delete Person
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserItem
