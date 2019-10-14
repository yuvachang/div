import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
//nonpackage imports
import { ReduxState } from '../../store'
import { UserObject } from '../../store/reducers/usersReducer'
import {
  addUser,
  updateUserName,
  updateUserPaid,
  updateUserOwe,
} from '../../store/actions/usersActions'
import { roundUSD } from '../functions'

interface OwnProps {
  user: UserObject
  idx: number
}

type Props = LinkDispatchProps & LinkMapProps & OwnProps

const UserItemInputs: React.FunctionComponent<Props> = props => {
  const [user, setUser] = useState<UserObject>(props.user)

  const updateStore = (targetName: string, value: string, idx: number):string => {
    switch (targetName) {
      case 'name': {
        props.updateName(value, props.idx)
        break
      }
      case 'paid': {
        props.updatePaid(String(roundUSD(+value)), props.idx)
        value = roundUSD(+value).toFixed(2)
        break
      }
      case 'owe': {
        props.updateOwe(String(roundUSD(+value)), props.idx)
        value = roundUSD(+value).toFixed(2)
        break
      }
    }

    return value
  }

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement
    let value: string = target.value

    // updateStore(target.name, value, props.idx)

    setUser({
      ...user,
      [target.name]: value,
    })
  }

  const formatOnBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement
    let value: string = target.value

    value = updateStore(target.name, value, props.idx)

    if (target.name === 'paid' || target.name === 'owe') {
      setUser({
        ...user,
        [target.name]: value,
      })
    }
  }

  const enterKeyListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // if (kc === 190 || kc === 110) {
    //   if (inputValue.includes('.')) {
    //     //if number already has decimal, do nothing
    //     e.preventDefault()
    //     return
    //   }
    // }
    const target = e.target as HTMLInputElement
    if (e.keyCode === 13) {
      target.blur()
      target.value = 'thisisatest'
    }
  }

  return (
    <div className='user-item-inputs'>
      <div className='segment'>
        <div className='title greytext'>Name:</div>
        <input
          className='bottom'
          type='text'
          name='name'
          value={user.name || ''}
          onChange={handleChange}
          onBlur={formatOnBlur}
          onKeyDown={enterKeyListener}
          spellCheck={false}
        />
      </div>
      <div className='segment'>
        <div className='title greytext'>Paid:</div>
        <div className='symbol greytext'>$</div>
        <input
          className='bottom'
          type='number'
          name='paid'
          value={user.paid || 0}
          onChange={handleChange}
          onBlur={formatOnBlur}
          onKeyDown={enterKeyListener}
        />
      </div>
      <div className='segment'>
        <div className='title greytext'>Owed:</div>
        <div className='symbol greytext'>$</div>
        <input
          className='bottom'
          type='number'
          name='owe'
          value={user.owe || 0}
          onChange={handleChange}
          onBlur={formatOnBlur}
          onKeyDown={enterKeyListener}
        />
      </div>
    </div>
  )
}

interface LinkMapProps {
  // users: UserObject[]
}

interface LinkDispatchProps {
  addUser: () => void
  updateName: (name: string, idx: number) => void
  updatePaid: (paid: string, idx: number) => void
  updateOwe: (owe: string, idx: number) => void
}

const mapState = (state: ReduxState, ownProps?: any) => ({
  // users: state.users.usersArr,
})

const mapDispatch = (dispatch: Dispatch, ownProps?: any): LinkDispatchProps => ({
  addUser: bindActionCreators(addUser, dispatch),
  updateName: bindActionCreators(updateUserName, dispatch),
  updatePaid: bindActionCreators(updateUserPaid, dispatch),
  updateOwe: bindActionCreators(updateUserOwe, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(UserItemInputs)
