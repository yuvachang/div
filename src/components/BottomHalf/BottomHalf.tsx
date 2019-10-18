import React, { useState } from 'react'
import { bindActionCreators, Dispatch } from 'redux'
import { ReduxState } from '../../store'
import { connect } from 'react-redux'
//import actionCreators
import { addUser, deleteUser, setColors } from '../../store/actions/usersActions'
//import components
import {} from '../functions'
import UserItem from './UserItem'
import { UsersPool, InitialsObject, DebtPool } from '../../store/reducers/usersReducer'
import Debts from './Debts'

type Props = LinkDispatchProps & LinkMapProps

const BottomHalf: React.FunctionComponent<Props> = props => {
  const usersArr = Object.keys(props.users).map(uid => props.users[uid])
  const [usersOpen, setUsersOpen] = useState<boolean>(true)
  const [openUsersArr, setOpenUsersArr] = useState<string[]>([])

  const openUsersCount = (add: boolean) => {
    if (add) {
      setOpenUsersArr([...openUsersArr, 'u'])
    } else {
      setOpenUsersArr([...openUsersArr.slice(1)])
    }
  }

  const checkUserOpen = () => {
    window.setTimeout(() => {
      let openUsers: any = document.getElementsByClassName('no-edit')
      openUsers = [...openUsers].filter(el => el.className === 'no-edit')
      // console.log(openUsers)
      if (!openUsers.length) {
        setUsersOpen(false)
      } else {
        setUsersOpen(true)
      }
    }, 150)
  }

  return (
    <div className='bottom-half'>
      <Debts
        users={props.users}
        debts={props.debts}
        initials={props.initials}
        total={props.total}
      />

      {!!usersArr.length && (
        <div
          className='grey-button-container'
          style={{ width: '100%', margin: `${usersOpen ? '5px 2px' : '0'}`, transition: '0.2s' }}>
          <div
            className='grey-button tiny'
            style={{ width: '100%', height: `${usersOpen ? '14px' : '0'}`, transition: '0.2s' }}
            onClick={() => {
              setUsersOpen(false)
            }}>
            Collapse all users
          </div>
        </div>
      )}

      {!!usersArr.length &&
        usersArr.map((user, idx) => {
          return (
            <UserItem
              usersOpen={usersOpen}
              checkUserOpen={checkUserOpen}
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
  debts: DebtPool
}

interface LinkDispatchProps {
  addUser: (total: number) => void
  deleteUser: (uid: string, total: number) => void
  setColors: () => void
}

const mapState = (state: ReduxState, ownProps?: any) => ({
  users: state.users.users,
  debts: state.users.debts,
  total: state.totals.total,
  initials: state.users.initials,
})

const mapDispatch = (dispatch: Dispatch, ownProps?: any): LinkDispatchProps => ({
  addUser: bindActionCreators(addUser, dispatch),
  deleteUser: bindActionCreators(deleteUser, dispatch),
  setColors: bindActionCreators(setColors, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(BottomHalf)
