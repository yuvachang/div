import React, { useState } from 'react'
import { UserObject } from '../../store/reducers/usersReducer'
import UserItemInputs from './UserItemInputs'
import Modal from '../Modal/Modal'

interface Props {
  user: UserObject
  total: number
  deleteUser: () => void
}

const UserItem: React.FunctionComponent<Props> = props => {
  const [collapsed, setCollapse] = useState<boolean>(true)
  const [displayModal, setDisplayModal] = useState<boolean>(false)

  const closeModal = (): void => {
    setDisplayModal(false)
  }

  const debtPaid = (): boolean => {
    const oa = props.user.oweAmount
    const p = props.user.paid
    const t = props.total
    const c = props.user.isCustomOweAmt

    return (!!c || t > 0) && p >= oa && (p > 0 || oa > 0)
  }

  return (
    <div className={`user-item ${debtPaid() ? 'debt-settled' : ''}`}>
      <div className={`no-edit${collapsed ? ' collapsed' : ''}`}>
        <div className='name greytext'>{props.user.name || 'Name'}</div>
        <div className='amounts'>Paid: ${props.user.paid}</div>
        <div className='amounts'>Owes: ${props.user.oweAmount}</div>
        <div className='arrow' onClick={() => setCollapse(!collapsed)}>
          <img
            src='/icons/down-arrow.png'
            alt='open/close'
            className={`arrowicon${collapsed ? '' : ' flip'}`}
          />
        </div>
      </div>

      <div className={`edits${collapsed ? ' collapsed' : ''}`}>
        <UserItemInputs user={{ ...props.user }} />

        <div className='grey-button-container' style={{ marginTop: '5px' }}>
          <div
            className='grey-button tiny red'
            onClick={() => {
              if (
                !props.user.name &&
                !props.user.paid &&
                (!props.user.isCustomOweAmt || !props.user.oweAmount)
              ) {
                props.deleteUser()
              } else {
                setDisplayModal(true)
              }
            }}>
            Delete Person
          </div>
        </div>
      </div>

      {displayModal && (
        <Modal
          yes={() => {
            props.deleteUser()
            closeModal()
          }}
          no={() => closeModal()}
          msg={`Delete ${props.user.name ? props.user.name : 'person'}?`}
          userItem={true}
        />
      )}
    </div>
  )
}

export default UserItem
