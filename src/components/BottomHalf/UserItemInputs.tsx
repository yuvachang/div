import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
//nonpackage imports
import { ReduxState } from '../../store'
import { UserObject } from '../../store/reducers/usersReducer'
import { addUser, updateUserName } from '../../store/actions/usersActions'

interface OwnProps {
  user: UserObject
  idx: number
}

type Props = LinkDispatchProps & LinkMapProps & OwnProps

const UserItemInputs: React.FunctionComponent<Props> = props => {
  const [user, setUser] = useState<UserObject>(props.user)

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement

    setUser({
      ...user,
      [target.name]: target.value,
    })

    if (target.name === 'name') {
      props.updateName(target.value, props.idx)
    } 
  }

  const updateStore = () => {

    
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
          onBlur={updateStore}
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
          onBlur={updateStore}
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
          onBlur={updateStore}
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
}

const mapState = (state: ReduxState, ownProps?: any) => ({
  // users: state.users.usersArr,
})

const mapDispatch = (dispatch: Dispatch, ownProps?: any): LinkDispatchProps => ({
  addUser: bindActionCreators(addUser, dispatch),
  updateName: bindActionCreators(updateUserName, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(UserItemInputs)
