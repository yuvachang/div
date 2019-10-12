import React, { useState } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
//nonpackage imports
import { ReduxState } from '../../store'
import { UserObject } from '../../store/reducers/usersReducer'
import { addUser } from '../../store/actions/usersActions'

interface OwnProps {
  name?: string
  paid?: number
}

type Props = LinkDispatchProps & LinkMapProps & OwnProps

const UserItem: React.FunctionComponent<Props> = props => {
  const [collapsed, setCollapse] = useState<boolean>(true)

  return (
    <div className='user-item'>
      <div className={`no-edit${collapsed ? ' collapsed' : ''}`}>
        <div className='name'>{props.name}</div>
        <div className='amounts'>Paid: ${props.paid}</div>
        <div className='arrow' onClick={() => setCollapse(!collapsed)}>
          <img src='/icons/down-arrow.png' className={`arrowicon${collapsed ? '' : ' flip'}`} />
        </div>
      </div>
      <div className={`edits${collapsed ? ' collapsed' : ''}`}>hello I am edits</div>
    </div>
  )
}

// UserItem.defaultProps = {
//   name: '',
//   paid: 0,
// }

// export default UserItem

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
)(UserItem)
