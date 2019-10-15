import * as actions from '../actions/actionTypes'
import { newStateUserOweAmts, createNewState, createInitialsArr, editInitials } from './utilFuncs'

export interface UserObject {
  name: string
  oweAmount: number
  paid: number
  isCustomOweAmt: boolean
}

export interface UserState {
  initials: Array<string>
  usersArr: Array<UserObject>
}

const initialState: UserState = {
  initials: [],
  usersArr: [],
}

const usersReducer = (state: UserState = initialState, { type, payload }: actions.ActionType) => {
  switch (type) {
    case actions.USE_LS_USERS: {
      let newState = { ...state }
      newState.usersArr = [...payload.users]
      // newState = newStateUserOweAmts()
      return {
        ...newState,
      }
    }
    case actions.USERS_ADD: {
      // Recalculate users' oweAmount.
      const newState = newStateUserOweAmts(
        {
          ...state,
          usersArr: [...state.usersArr, payload.user],
        },
        payload.total
      )

      const newInitials = createInitialsArr(newState.usersArr)

      return {
        ...newState,
        initials: newInitials,
      }
    }

    case actions.USERS_DELETE: {
      const newUsers = [...state.usersArr]
      newUsers.splice(payload.idx, 1)

      const newState = newStateUserOweAmts({ ...state, usersArr: newUsers }, payload.total)

      const newInitials = createInitialsArr(newState.usersArr)

      return {
        ...newState,
        initials: newInitials,
      }
    }
    case actions.USERS_NAME: {
      const newState: UserState = createNewState(state, 'name', payload)

      const newInitials = editInitials(newState.initials, payload.name, payload.idx)

      return {
        ...newState,
        initials: newInitials,
      }
    }

    case actions.USERS_PAID: {
      const newState: UserState = createNewState(state, 'paid', payload)
      // Calculate user debts.

      return {
        ...newState,
      }
    }
    case actions.USERS_OWE: {
      const newState: UserState = createNewState(state, 'oweAmount', payload)
      // Recalculate users' oweAmount

      return {
        ...newState,
      }
    }
    case actions.USERS_TOGGLECUSTOWE: {
      const newState: UserState = createNewState(state, 'oweCustom', payload)
      // Recalculate users' oweAmount

      return {
        ...newState,
      }
    }
    case actions.CALC_OWES: {
      let newState = newStateUserOweAmts(state, payload.total)
      return {
        ...newState,
        usersArr: newState.usersArr,
      }
    }
    default:
      return state
  }
}

export default usersReducer
