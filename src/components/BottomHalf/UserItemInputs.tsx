import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
//nonpackage imports
import { ReduxState } from '../../store'
import { UserObject } from '../../store/reducers/usersReducer'
import { addUser } from '../../store/actions/usersActions'

interface OwnProps {
  user: UserObject
}

type Props = LinkDispatchProps & LinkMapProps & OwnProps

const UserItemInputs: React.FunctionComponent<Props> = props => {
  const [user, setUser] = useState<UserObject>(props.user)

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {}

  const updateStore = () => {}

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
        />
      </div>
      <div className='segment'>
        <div className='title greytext'>Paid:</div>
        <input
          className='bottom'
          type='text'
          name='paid'
          value={user.paid || 0}
          onChange={handleChange}
          onBlur={updateStore}
        />
      </div>
      <div className='segment'>
        <div className='title greytext'>Owed:</div>
        <input
          className='bottom'
          type='text'
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
}

const mapState = (state: ReduxState, ownProps?: any) => ({
  // users: state.users.usersArr,
})

const mapDispatch = (dispatch: Dispatch, ownProps?: any): LinkDispatchProps => ({
  addUser: bindActionCreators(addUser, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(UserItemInputs)
