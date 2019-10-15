import React from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { ReduxState } from '../../store'
import { connect } from 'react-redux'
//import actionCreators
import { addUser, deleteUser } from '../../store/actions/usersActions'
//import components
import {} from '../functions'
import UserItem from './UserItem'
import { UserObject } from '../../store/reducers/usersReducer'

type Props = LinkDispatchProps & LinkMapProps

const BottomHalf: React.FunctionComponent<Props> = props => {
  console.log('bottomhalf')
  return (
    <div className='bottom-half'>
      {!!props.users.length &&
        props.users.map((user, idx) => {
          return (
            <UserItem
              key={idx}
              deleteUser={() => props.deleteUser(idx, props.total)}
              user={{ ...user }}
              idx={idx}
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
  users: UserObject[]
  // link total to trigger update child component
  total: number
}

interface LinkDispatchProps {
  addUser: (total: number) => void
  deleteUser: (idx: number, total: number) => void
}

const mapState = (state: ReduxState, ownProps?: any) => ({
  users: state.users.usersArr,
  total: state.totals.total,
})

const mapDispatch = (dispatch: Dispatch, ownProps?: any): LinkDispatchProps => ({
  addUser: bindActionCreators(addUser, dispatch),
  deleteUser: bindActionCreators(deleteUser, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(BottomHalf)
