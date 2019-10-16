import React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { ReduxState } from '../../store'
import { connect } from 'react-redux'
//import actionCreators
import { addUser, deleteUser } from '../../store/actions/usersActions'
//import components
import {} from '../functions'
import UserItem from './UserItem'
import { UsersPool, InitialsObject } from '../../store/reducers/usersReducer'

type Props = LinkDispatchProps & LinkMapProps

const BottomHalf: React.FunctionComponent<Props> = props => {
  const usersArr = Object.keys(props.users).map(uid=>props.users[uid])

  return (
    <div className='bottom-half'>
      {!!props.initials.length && (
        <div className='user-bubbles'>
          {props.initials.map((InitialsObject, idx) => {
            return (
              <div className='bubble' key={idx + 'init'}>
                {InitialsObject.init}
              </div>
            )
          })}
        </div>
      )}
      {!!usersArr.length &&
        usersArr.map((user, idx) => {
          return (
            <UserItem
              key={user.uid}
              deleteUser={() => props.deleteUser(user.uid, props.total)}
              user={{ ...user }}
              total={props.total}
            />
          )
        })}
      <div className='user-item button' onClick={() => props.addUser(props.total)}>
        add person
      </div>
    </div>
  )
}

interface LinkMapProps {
  users: UsersPool
  total: number
  initials: Array<InitialsObject>
}

interface LinkDispatchProps {
  addUser: (total: number) => void
  deleteUser: (uid: string, total: number) => void
}

const mapState = (state: ReduxState, ownProps?: any) => ({
  users: state.users.users,
  total: state.totals.total,
  initials: state.users.initials,
})

const mapDispatch = (dispatch: Dispatch, ownProps?: any): LinkDispatchProps => ({
  addUser: bindActionCreators(addUser, dispatch),
  deleteUser: bindActionCreators(deleteUser, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(BottomHalf)
