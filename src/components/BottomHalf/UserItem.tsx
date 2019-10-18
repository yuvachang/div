import React, { useState, useEffect } from 'react'
import { UserObject } from '../../store/reducers/usersReducer'
import UserItemInputs from './UserItemInputs'
import Modal from '../Modal/Modal'

interface Props {
  user: UserObject
  total: number
  deleteUser: () => void
  checkUserOpen: () => void
  usersOpen: boolean
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

  const toggleCollapse = () => {
    if (collapsed) {
      props.checkUserOpen()
      setCollapse(false)
    } else {
      props.checkUserOpen()
      setCollapse(true)
    }
  }

  useEffect(() => {
    if (!props.user.name) {
      setCollapse(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!props.usersOpen) {
      setCollapse(true)
    }
  }, [props.usersOpen])

  return (
    <div
      className={`user-item ${debtPaid() ? 'debt-settled' : ''}`}
      // style={{border: `1px solid ${props.user.color}`}}
    >
      <div className='color-bar' style={{ backgroundColor: props.user.color }} />
      <div className={`no-edit${collapsed ? ' collapsed' : ''}`}>
        <div className='name greytext'>{props.user.name || 'Name'}</div>
        <div className='amounts'>Paid: ${props.user.paid}</div>
        <div className='amounts'>Bal: ${props.user.oweAmount}</div>
        <div className='arrow' onClick={toggleCollapse}>
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
