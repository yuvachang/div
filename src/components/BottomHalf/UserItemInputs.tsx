import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
//nonpackage imports
import { ReduxState } from '../../store'
import { UserObject } from '../../store/reducers/usersReducer'
import {
  updateUserName,
  updateUserPaid,
  updateUserOweAmount,
  toggleIsCustomOweAmt,
  calcOweAmounts,
} from '../../store/actions/usersActions'
import { roundUSD, capitalizeWords } from '../functions'

interface OwnProps {
  user: UserObject
  idx: number
}

type Props = LinkDispatchProps & LinkStateProps & OwnProps

const UserItemInputs: React.FunctionComponent<Props> = props => {
  const [user, setUser] = useState<UserObject>({ ...props.user })

  // Update user &&=>input values when user list changes
  useEffect(() => {
    console.log('useeffect')
    setUser({ ...props.user })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user.name])

  const updateStore = (targetName: string, value: string): string => {
    switch (targetName) {
      case 'name': {
        value = capitalizeWords(value)
        props.updateName(value, props.idx)
        break
      }
      case 'paid': {
        props.updatePaid(String(roundUSD(+value)), props.idx)
        value = roundUSD(+value).toFixed(2)
        break
      }
      case 'oweAmount': {
        props.updateUserOweAmt(String(roundUSD(+value)), props.idx, props.total)
        props.calcOweAmounts(props.total)
        value = roundUSD(+value).toFixed(2)
        break
      }
    }

    if (+value === 0) {
      if (targetName === 'name') {
        return ''
      } else {
        return '0'
      }
    } else return value
  }

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement
    let value: string = target.value

    setUser({
      ...user,
      [target.name]: value,
    })
  }

  const formatOnBlur = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement
    let value: string = target.value

    value = updateStore(target.name, value)

    setUser({
      ...user,
      [target.name]: value,
    })
  }

  const enterKeyListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    const key = e.which || e.keyCode
    if (target.name === 'name') {
      if ((key >= 37 && key <= 40) || (key >= 48 && key <= 57)) {
        e.preventDefault()
        return
      }
    }

    if (e.keyCode === 190 || e.keyCode === 110) {
      if (target.value.includes('.')) {
        // If number already has decimal, do nothing
        e.preventDefault()
        return
      }
    }
    if (e.keyCode === 13) {
      target.blur()
    }
  }

  const oweButtonHandler = () => {
    const bool = !user.isCustomOweAmt
    props.toggleCustOweAmt(bool, props.idx)
    props.calcOweAmounts(props.total)

    setUser({
      ...user,
      isCustomOweAmt: bool,
      oweAmount: props.user.oweAmount,
    })
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
        <div className='title greytext'>Owes:</div>
        <div className='symbol greytext'>$</div>
        <input
          className={`bottom ${user.isCustomOweAmt ? '' : 'no-hover'}`}
          type='number'
          name='oweAmount'
          value={user.isCustomOweAmt ? user.oweAmount : props.user.oweAmount || 0}
          onChange={handleChange}
          onBlur={formatOnBlur}
          onKeyDown={enterKeyListener}
          disabled={!user.isCustomOweAmt}
        />
        <div className='button'>
          <img
            alt='edit/clear'
            src={!!user.isCustomOweAmt ? '/icons/remove.svg' : '/icons/edit.svg'}
            className='arrowicon'
            onClick={oweButtonHandler}
          />
        </div>
      </div>
    </div>
  )
}

interface LinkStateProps {
  total: number
  // ruser: UserObject
}

interface LinkDispatchProps {
  updateName: (name: string, idx: number) => void
  updatePaid: (paid: string, idx: number) => void
  updateUserOweAmt: (oweAmount: string, idx: number, total: number) => void
  toggleCustOweAmt: (isCustom: boolean, idx: number) => void
  calcOweAmounts: (total: number) => void
}

const mapState = (state: ReduxState, ownProps?: any) => ({
  total: state.totals.total,
  // ruser: state.users.usersArr[ownProps.idx]
})

const mapDispatch = (dispatch: Dispatch, ownProps?: any): LinkDispatchProps => ({
  updateName: bindActionCreators(updateUserName, dispatch),
  updatePaid: bindActionCreators(updateUserPaid, dispatch),
  updateUserOweAmt: bindActionCreators(updateUserOweAmount, dispatch),
  toggleCustOweAmt: bindActionCreators(toggleIsCustomOweAmt, dispatch),
  calcOweAmounts: bindActionCreators(calcOweAmounts, dispatch),
})

export default connect(
  mapState,
  mapDispatch
)(UserItemInputs)
