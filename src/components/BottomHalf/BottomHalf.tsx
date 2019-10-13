import React, { useState, useEffect } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { ReduxState } from '../../store'
import { connect } from 'react-redux'
//import actionCreators
import { addUser } from '../../store/actions/usersActions'
//import components
import {} from '../functions'
import UserItem from './UserItem'
import { UserObject } from '../../store/reducers/usersReducer'

type Props = LinkDispatchProps & LinkMapProps

const BottomHalf: React.FunctionComponent<Props> = props => {
  return (
    <div className='bottom-half'>
      {!!props.users.length &&
        props.users.map((user, idx) => {
          return <UserItem key={idx} user={user} idx={idx}/>
        })}
      <div className='user-item button' onClick={props.addUser}>
        add person
      </div>
    </div>
  )
}

interface LinkMapProps {
  users: UserObject[]
}

interface LinkDispatchProps {
  addUser: () => void
}

const mapState = (state: ReduxState, ownProps?: any) => ({
  users: state.users.usersArr,
})

const mapDispatch = (dispatch: Dispatch, ownProps?: any): LinkDispatchProps => ({
  addUser: bindActionCreators(addUser, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(BottomHalf)
